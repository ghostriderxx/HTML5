package webj2ee;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HandleJSONP")
public class HandleJSONP extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public HandleJSONP() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String callbackName = request.getParameter("callbackName");
		
		String xm = request.getParameter("xm");
		String age = request.getParameter("age");
		String idno = request.getParameter("idno");
		
		System.out.println(xm);
		System.out.println(age);
		System.out.println(idno);
		
		response.getWriter().write(callbackName + "('Data Sent From Server!')");
	}
}
