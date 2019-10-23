package com.ship.web.usr;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ship.web.cmm.IConsumer;
import com.ship.web.cmm.IFunction;
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
    @Autowired UserMapper userMapper;
    
    
    @PostMapping("/")
    public String join(@RequestBody User param) {
        IConsumer<User> t = T -> userMapper.insertUser(param);
        t.accept(param);
        return "SUCCESS";
    }
    @PostMapping("/login")
    public User login(@RequestBody User param) {
    	IFunction<User,User> f = o -> userMapper.selectByIdPw(param);
        return f.apply(param);
    }      
}