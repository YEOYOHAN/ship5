package com.ship.web.pxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.ship.web.brd.ArticleMapper;
import com.ship.web.cmm.ISupplier;
import com.ship.web.utl.Printer;
import lombok.Data;

@Component
@Data
@Lazy
public class Proxy {
    private int pageNum, pageSize, startRow, endRow;
    private String search;
    private final int BLOCK_SIZE = 5;
    @Autowired Printer printer;
    @Autowired ArticleMapper articleMapper;
    @SuppressWarnings("unused")
    
	public void paging() {
        ISupplier<String> s = ()-> articleMapper.countArticle();
        int totalCount = Integer.parseInt(s.get());
        int pageCount = (totalCount%pageSize ==0) ?totalCount/pageSize : (totalCount/pageSize)+1;
        startRow = (pageNum -1) * pageSize;
        endRow = (pageNum == pageCount)?totalCount-1:startRow+pageSize-1;
        int blockCount = (pageCount%BLOCK_SIZE==0)?pageCount/BLOCK_SIZE:(pageCount/BLOCK_SIZE)+1;
        int blockNum = (pageNum-1) / BLOCK_SIZE;
        int startPage = BLOCK_SIZE-4;
        int endPage = (blockNum+1)*BLOCK_SIZE;
        boolean existPrev = false;
        boolean existNext = false;
    }
    public int parseInt(String param) {
    	Function<String, Integer> f = s -> Integer.parseInt(s);
		return f.apply(param);
	}
    public List<?> crawl(Map<?,?> paramMap){
        
        String url = "http://"+paramMap.get("site")+"/";
        printer.accept("넘어온 url\n"+url);
        List<String> proxylist = new ArrayList<>();
        proxylist.clear();
        try {
        Connection.Response response = Jsoup.connect(url).method(Connection.Method.GET).execute();
        
        Document document = response.parse();
        String text = document.html();
        //String text = document.text();
        printer.accept("크롤링한텍스트\n"+text);
        proxylist.add(text);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return proxylist;
    }
}
