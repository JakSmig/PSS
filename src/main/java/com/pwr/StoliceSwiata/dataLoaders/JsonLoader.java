package com.pwr.StoliceSwiata.dataLoaders;

import com.pwr.StoliceSwiata.Repositories.*;
import com.pwr.StoliceSwiata.controllers.CapitalController;
import com.pwr.StoliceSwiata.controllers.CommentController;
import com.pwr.StoliceSwiata.controllers.UserController;
import com.pwr.StoliceSwiata.dbSchema.Avatar;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Images;
import com.pwr.StoliceSwiata.dbSchema.User;
import com.pwr.StoliceSwiata.dbSchema.enums.UserRole;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


//If ever need to load from in jar https://smarterco.de/java-load-file-from-classpath-in-spring-boot/

@Component
public class JsonLoader {
    @Value("classpath:/data/data.json")
    Resource capitalsJSON;

    @Autowired
    ResourceLoader resourceLoader;
    @Autowired
    private CapitalController capitalController;
    @Autowired
    private UserController userController;
    @Autowired
    private CommentController commentController;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ImagesRepository imagesRepository;
    @Autowired
    private AvatarRepository avatarRepository;


    public void loadDataFromJSONs(){
        loadDataToCapitals(extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/fullcapdata.json")),extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/flags.json")));
        loadDataToAvatars(extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/avatars.json")));
        loadDataToUsers(extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/userDataInit.json")));
        loadCommentsAndLikesFromJson(extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/commentTestData.json")));
    }
    private JSONArray extractJSONArrayFromResource(Resource resource){
        try{
            InputStream jsonAsFile = resource.getInputStream();
            JSONTokener tokener = new JSONTokener(new InputStreamReader(jsonAsFile));
            return new JSONArray(tokener);
        }
        catch (IOException | NullPointerException e) {
            System.out.println("Couldn't load data form:" + resource.getFilename());
        }
        return new JSONArray();


    }

    private Resource loadResourceWithResourceLoader(String path) {
        Resource a = resourceLoader.getResource(path);
        if(!a.exists()){
            System.out.println("Resource is null");
        }
        return resourceLoader.getResource(path);
    }

    private void loadDataToCapitals(JSONArray capitalsArray, JSONArray flagsArray){
        System.out.println("{LOCAL DATA LOADING}      Loading capitals data");
        int addedCounter = 0;
        for (int i = 0; i < capitalsArray.length(); i++) {
            JSONObject cap = capitalsArray.getJSONObject(i);
            Images img = null;
            for(int j=0; j<flagsArray.length(); j++){
                JSONObject flag = flagsArray.getJSONObject(j);
                //System.out.println(flag);
                //System.out.println(cap.getString("country"));
                if(cap.getString("country").equals(flag.getString("Country"))){
                    //System.out.println("mached");
                    //System.out.println(flag.getString("country"));
                    //Mached flag with capital
                    img = new Images("flag/"+cap.getString("country"), flag.getString("b64"));
                    imagesRepository.save(img);

                }
            }

            ResponseEntity response = capitalController.addCapital(cap.getString("capital"),
                                                                    cap.getString("country"),
                                                                    cap.getString("description"),
                                                                    cap.getString("coordinates"),
                                                                    img,
                                                                    cap.getString("currency"));
            if(response.getStatusCode() == HttpStatus.OK){
                addedCounter++;
            }
        }
        System.out.println("{LOCAL DATA LOADING}      Added " + String.valueOf(addedCounter) + " capitals to the database");

    }

    private void loadDataToUsers(JSONArray usersArray){
        System.out.println("{LOCAL DATA LOADING}      Loading users data");
        int addedCounter = 0;
        for (int i = 0; i < usersArray.length(); i++) {
            JSONObject user = usersArray.getJSONObject(i);
            ResponseEntity response = userController.addUser(user.getString("username"),
                                                                user.getString("password"),
                                                                user.getString("email"));
            if(response.getStatusCode() == HttpStatus.OK){
                addedCounter++;
            }
        }
        System.out.println("{LOCAL DATA LOADING}      Added " + String.valueOf(addedCounter) + " users to the database");

    }
    private void loadDataToAvatars(JSONArray usersArray){
        System.out.println("{LOCAL DATA LOADING}      Loading avatars data");
        int addedCounter = 0;
        for (int i = 0; i < usersArray.length(); i++){
            JSONObject avatarJson = usersArray.getJSONObject(i);
            List<Avatar> queryAvatar = avatarRepository.findByValue(avatarJson.getString("value"));
            if(queryAvatar.size() == 0){
                Avatar avatar = new Avatar();
                avatar.setValue(avatarJson.getString("value"));
                addedCounter++;
                avatarRepository.save(avatar);
            }


        }
        System.out.println("{LOCAL DATA LOADING}      Added " + String.valueOf(addedCounter) + " Avatars to the database");
    }

    private void loadCommentsAndLikesFromJson(JSONArray commentArray){
        System.out.println("{LOCAL DATA LOADING}      Loading comment data");
        int addedCounter = 0;
        for (int i = 0; i < commentArray.length(); i++) {
            JSONObject comment = commentArray.getJSONObject(i);
            ResponseEntity response = commentController.addCommentToCapital(comment.getString("capitalName"),
                                                                "",
                                                                            comment.getString("username"),
                                                                            comment.getString("c_text"),
                                                                            comment.getFloat("rating_food"),
                                                                            comment.getFloat("rating_transport"),
                                                                            comment.getFloat("rating_atraction"),
                                                                            comment.getFloat("rating_general"));
            if(response.getStatusCode() == HttpStatus.OK){
                addedCounter++;
            }else{
                System.out.println(response.getBody());
            }
        }
        System.out.println("{LOCAL DATA LOADING}      Added " + String.valueOf(addedCounter) + " comments to the database");
        System.out.println("{LOCAL DATA LOADING}      Generating likes for comments");
        Iterable<User> userIter = userRepository.findAll();
        List<User> userList = new ArrayList<User>();
        userIter.forEach(userList::add);
        Iterable<Comment> commentIter = commentRepository.findAll();
        List<Comment> commentList = new ArrayList<Comment>();
        commentIter.forEach(commentList::add);

        //hardcoded
        System.out.println(commentController.changeLikeValueInComment(commentList.get(0).getId(), userList.get(2).getSessiontoken(), 1).getBody());
        System.out.println(commentController.changeLikeValueInComment(commentList.get(0).getId(), userList.get(2).getSessiontoken(), 1).getBody());
        System.out.println(commentController.changeLikeValueInComment(commentList.get(0).getId(), userList.get(1).getSessiontoken(), -1).getBody());
        System.out.println(commentController.changeLikeValueInComment(commentList.get(1).getId(), userList.get(0).getSessiontoken(), -1).getBody());
        System.out.println(commentController.changeLikeValueInComment(commentList.get(1).getId(), userList.get(2).getSessiontoken(), -1).getBody());
        System.out.println(commentController.changeLikeValueInComment(commentList.get(1).getId(), userList.get(2).getSessiontoken(), -1).getBody());

        System.out.println("{LOCAL DATA LOADING}      Likes generated");

    }

    public void printTest(){
        Resource res = loadResourceWithResourceLoader("classpath:data/capdata.json");
        System.out.println(res);
        JSONArray jArr = extractJSONArrayFromResource(res);
        if(!jArr.isEmpty()){
            JSONObject jObj = jArr.getJSONObject(0);
            System.out.println(jObj.getString("capital"));
            System.out.println(jObj.getString("country"));
            System.out.println(jObj.getString("description"));
        }else{
            System.out.println(jArr.toString());
        }




    }
}
