package com.ship.web.test;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Crawler {
	public static void main(String[] args) {
		try {
			Document rawData = Jsoup.connect("http://lol.inven.co.kr/dataninfo/champion/manualTool.php?pg=2").timeout(10*1000).get();
			Elements title = rawData.select("a[class=\"list\"]");
			List<String> title2 = new ArrayList<>();
			for(Element e : title) {
				title2.add(e.text());
			}
			System.out.println(title2);
		} catch (Exception e2) {
			// TODO: handle exception
			e2.printStackTrace();
		}
	}
}
