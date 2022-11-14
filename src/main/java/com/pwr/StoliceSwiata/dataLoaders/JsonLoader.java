package com.pwr.StoliceSwiata.dataLoaders;

import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.controllers.CapitalController;
import com.pwr.StoliceSwiata.controllers.UserController;
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

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;


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


    public void loadDataFromJSONs(){
        loadDataToCapitals(extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/capdata.json")));
        loadDataToUsers(extractJSONArrayFromResource(loadResourceWithResourceLoader("classpath:data/userDataInit.json")));
    }
    private JSONArray extractJSONArrayFromResource(Resource resource){
        try{
            File jsonAsFile = resource.getFile();
            JSONTokener tokener = new JSONTokener(new FileReader(jsonAsFile));
            return new JSONArray(tokener);
        }
        catch (IOException | NullPointerException e) {
            System.out.println("Couldn't load data form:" + resource.getFilename());
        }
        return new JSONArray();


    }

    private Resource loadResourceWithResourceLoader(String path) {

        Resource a = resourceLoader.getResource(path);
        return resourceLoader.getResource(path);
    }

    private void loadDataToCapitals(JSONArray capitalsArray){
        System.out.println("{LOCAL DATA LOADING}      Loading capitals data");
        int addedCounter = 0;
        for (int i = 0; i < capitalsArray.length(); i++) {
            JSONObject cap = capitalsArray.getJSONObject(i);
            ResponseEntity response = capitalController.addCapital(cap.getString("country"),
                                                                    cap.getString("capital"),
                                                                    cap.getString("description"),
                                                                    "");
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
