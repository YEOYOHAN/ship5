package com.ship.web.adm;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
	public void insertAdmin(Admin admin);
	public Admin selectAdminByIdPw(Admin admin);
}
