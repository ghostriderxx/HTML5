package webj2ee;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class SpringUpload {

	@RequestMapping(value = "/SpringUpload")
	public String handleUpload(@RequestParam(value = "myfile") MultipartFile file) {
		try {
			// 上传文件信息
			String fieldName = file.getName();
			String fileName = file.getOriginalFilename();
			long fileSize = file.getSize();
			InputStream is = file.getInputStream();
			
			System.out.println("fieldName:"+fieldName+", fileName:"+fileName + ",fileSize:"+ fileSize / 1000 + "K");
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		return null;
	}
}
