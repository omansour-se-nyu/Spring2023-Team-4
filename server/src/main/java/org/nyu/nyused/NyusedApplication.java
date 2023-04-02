package org.nyu.nyused;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class NyusedApplication {

    public static void main(String[] args) {

        SpringApplication.run(NyusedApplication.class, args);
        log.info("Backend is running");
    }
}