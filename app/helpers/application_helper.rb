# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
def get_month(month)
	case month
	when 1
	  "Jan"
	when 2
	  "Feb"
	when 3
	  "Mar"
	when 4
	  "Apr"
	when 5
	  "May"
	when 6
	  "Jun"
	when 7
	  "Jul"
	when 8
	  "Aug"
	when 9
	  "Sep"
	when 10
	  "Oct"
	when 11
	  "Nov"
	when 12
	  "Dec"
	end
end
def bill_status(status)
	return "Paid" if status == true
	return "Not Paid"
end

def get_paper_day(paper)
	return paper.day if !paper.paper_type.blank? and paper.paper_type == "News paper"
	return "-"
end

def get_paper_qunt(paper)
	return paper.qunt if !paper.paper_type.blank? and paper.paper_type != "News paper"
	return "-"
end
end
