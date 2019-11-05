package com.ship.web.brd;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ship.web.pxy.Proxy;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article param);
	public String countArticle();
	public void selectArticle(Article param);
	public void updateArticle(Article param);
	public void deleteArticle(Article param);
	public List<Article> selectList(Proxy pxy);
}