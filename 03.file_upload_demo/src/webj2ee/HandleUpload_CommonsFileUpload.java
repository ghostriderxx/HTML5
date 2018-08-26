package webj2ee;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/HandleUpload_CommonsFileUpload")
public class HandleUpload_CommonsFileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public HandleUpload_CommonsFileUpload() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		// 检测是否为文件上传请求
		if (!ServletFileUpload.isMultipartContent(request)) {
			throw new RuntimeException("不是文件上传请求!");

		}

		// 配置上传文件缓存策略
		// 1. SizeThreshold: 缓存文件大小阈值
		// 		a.上传文件小于此阈值，暂存于内存；
		// 		b.上传文件大于此阈值，暂存于磁盘；
		// 2. Repository: 上传文件暂存于磁盘时的目录；
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(512); // 默认值:10240
		factory.setRepository(new File("d:/temp"));

		// 文件上传相关参数
		// 1. FileSizeMax: 限制请求中单个文件大小
		// 2. SizeMax: 限制请求的总大小
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(1024 * 1024); // 默认：-1，无限制
		upload.setSizeMax(2048 * 1024); // 默认：-1，无限制
		
		// 分析请求
		try {
			List<FileItem> items = upload.parseRequest(request);
			Iterator<FileItem> iter = items.iterator();
			while (iter.hasNext()) {
				FileItem item = iter.next();
				if (item.isFormField()) {
					// 普通字段
					String fieldName = item.getFieldName(); // 字段名
					String fieldValue = item.getString("UTF-8");// 字段值

					// ....
					System.out.println("fieldName:"+fieldName+", fieldValue:"+fieldValue);
				} else {
					// 文件字段
					String fieldName = item.getFieldName(); // 字段名
					String fileName = item.getName(); // 文件名
					long fileSize = item.getSize(); // 文件尺寸
					item.getInputStream(); // 文件流
					
					// ....
					System.out.println("fieldName:"+fieldName+", fileName:"+fileName + ",fileSize:"+ fileSize / 1000 + "K");
				}
			}
		} catch (FileUploadException e) {
			throw new RuntimeException(e);
		}
	}
}
