package com.ship.web.adm;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ship.web.cmm.IConsumer;
import com.ship.web.cmm.IFunction;
import com.ship.web.utl.Printer;

@RestController
@RequestMapping("/admins")
public class AdminCtrl {
    @Autowired Map<String,Object> map;
    @Autowired Admin admin;
    @Autowired AdminMapper adminMapper;
    @Autowired Printer printer;
    
    @PostMapping("/")
    public Map<?,?> register(@RequestBody Admin param) {
        IConsumer<Admin> c = t -> adminMapper.selectAdminByIdPw(param);
        c.accept(param);
        map.clear();
        map.put("msg", "SUCCESS");
        return map;
    }
    
    @PostMapping("/{eid}")
    public Map<?,?> access(@PathVariable String eid, @RequestBody Admin param) {
        IFunction<Admin, Admin> f = t -> adminMapper.selectAdminByIdPw(param);
        printer.accept("엑세스드렁옴");
        map.clear();
        map.put("msg", (f.apply(param)!=null)?"SUCCESS":"FAIL");
        return map;
    }
    
    
    @PutMapping("/{eid}")
    public Map<?,?> update(@PathVariable String eid, @RequestBody Admin param){
        
        return map;
    }
    @DeleteMapping("/{eid}")
    public Map<?,?> delete(@PathVariable String eid, @RequestBody Admin param){
        
        return map;
    }
}