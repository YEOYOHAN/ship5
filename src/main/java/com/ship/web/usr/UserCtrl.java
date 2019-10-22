package com.ship.web.usr;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ship.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/users")
@Log4j
public class UserCtrl {
	private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
    @Autowired Map<String, Object> map;
    @Autowired User user;
    @Autowired Printer printer;
    
    
    @PostMapping("/")
    public Map<?,?> join(@RequestBody User param) {
        
        //logger.info("ajax가 보낸 아이디와 비번 {}",param.getUid()+","+param.getUpw()+","+param.getUname());
        printer.accept("람다 프린터가 출력한 값 "+param.getUid()+","+param.getUpw()+","+param.getUname());
        HashMap<String, String> map = new HashMap<>();
        map.put("uid", param.getUid());
        map.put("upw", param.getUpw());
        map.put("uname", param.getUname());
        logger.info("map에 담긴 아이디와 비번 {}",map.get("uid")+","+map.get("upw"));
        return map;
    }
    @PostMapping("/login")
    public User login(@RequestBody User param) {
        
        logger.info("ajax가 보낸 login아이디와 비번 {}",param.getUid()+","+param.getUpw());
        user.setUid(param.getUid());
        user.setUpw(param.getUpw());
        logger.info("user에 담긴 login아이디와 비번 {}",user.toString());
        return user;
    }
        
    
    
    /*@GetMapping("/count")
    public String count(Model model) {
        int count = userService.countUser();
        model.addAttribute("count" , count);
        return "home";
    }*/
        
}
