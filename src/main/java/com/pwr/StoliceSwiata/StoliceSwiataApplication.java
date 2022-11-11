package com.pwr.StoliceSwiata;

import com.pwr.StoliceSwiata.dataLoaders.JsonLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableSwagger2
public class StoliceSwiataApplication {
	@Autowired
	JsonLoader jLoader; // = new JsonLoader();
	public static void main(String[] args) {
		SpringApplication.run(StoliceSwiataApplication.class, args);


	}

	@PostConstruct
	public void dataLoading(){
		jLoader.loadDataFromJSONs();
	}




}

