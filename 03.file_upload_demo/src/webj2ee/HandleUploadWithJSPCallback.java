package webj2ee;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@MultipartConfig()
@WebServlet("/HandleUploadWithJSPCallback")
public class HandleUploadWithJSPCallback extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public HandleUploadWithJSPCallback() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		
		// 解析上传文件
		StringBuilder submittedFilesInfo = new StringBuilder();
		Collection<Part> parts = request.getParts();
		Iterator<Part> itor = parts.iterator();
		while(itor.hasNext()) {
			Part part = itor.next();
			String name = part.getName();
			String submittedFileName = part.getSubmittedFileName();
			long size = part.getSize();
			String contentType = part.getContentType();
			submittedFilesInfo.append(name+": "+submittedFileName+", "+contentType+", "+size/1000 + "K" + "\r\n");
		}
		
		// 回调函数名、参数
		String callbackFnName = request.getParameter("callbackFnName");
		String callbackParams = "来自Servlet的返回值...";
		
		// 返回上传成功页面，触发上传成功回调函数
		request.setAttribute("submittedFilesInfo", submittedFilesInfo);
		request.setAttribute("callbackFnName", callbackFnName);
		request.setAttribute("callbackParams", callbackParams);
		request.getRequestDispatcher("./form_upload_callback_trigger.jsp").forward(request, response);
	}
}
