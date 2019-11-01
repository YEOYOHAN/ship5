package com.ship.web.aop;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ship.web.utl.Printer;


@RestController
@Transactional
@RequestMapping("/txcons")
public class TxController {
	@Autowired Printer p;
	@Autowired TxService txService;
	
	@GetMapping("/crawling/{site}/{srch}")
	public void bringUrl(@PathVariable String site, @PathVariable String srch) {
		HashMap<String, String> map = new HashMap<>();
		p.accept(site +", srch "+srch);
		map.clear();
		map.put("site", site);
		map.put("srch", srch);
		txService.crawling(map);
	}
}
