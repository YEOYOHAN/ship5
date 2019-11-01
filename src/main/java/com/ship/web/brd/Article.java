package com.ship.web.brd;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@Component
@AllArgsConstructor
@NoArgsConstructor
@Lazy
public class Article {
	private String artseq, image, uid, comments, msg, rating, boardtype, title, content; 
}