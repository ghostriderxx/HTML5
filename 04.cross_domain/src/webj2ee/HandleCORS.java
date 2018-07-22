package webj2ee;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HandleCORS")
public class HandleCORS extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public HandleCORS() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("Hello WebJ2EE!");
	}
}
