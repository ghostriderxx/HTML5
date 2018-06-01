package webj2ee;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/SaveFile")
@MultipartConfig
public class SaveFile extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public SaveFile() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Part part = request.getPart("myfile");
		String submittedFileName = part.getSubmittedFileName();
		String contentType = part.getContentType();
		
		System.out.println(submittedFileName);
		System.out.println(contentType);
		
		
		PrintWriter out = response.getWriter();
        out.println("Upload Success!");
        out.flush();
        out.close();
	}

}
