	function _(x) { return document.getElementById(x) };
	
	function hasClass(element, className){
		return element.className.split(" ").indexOf(className) > -1;
	}
	
	function addClass(element, className){
		if(hasClass(element, className)){
			return element.classList;
		} else {
			return element.classList.add(className);
		}
	}
	
	function removeClass(element, className){
		if(hasClass(element, className)){
			return element.classList.remove(className);
		}else{
			return element.classList;
		}
	}
	function daysinMonth(month, year){
		console.log(month,year)
		return new Date(year, month, 0).getDate();
	}
	let today = new Date();
	let currentMonth = today.getMonth()+1;
	let currentYear = today.getFullYear();
	let todaysDate = new Date().getDate()
	console.log(todaysDate);
	let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			
	let monthAndYear = document.getElementById("monthAndYear");
	function showCalendar(month, year){
		let firstDay = new Date(year, month).getDay();
		let daysInMonth = 32 - new Date(year, month, 32).getDate();
		let tbl = document.getElementById("calendar-body");
		tbl.innerHTML = "";
		monthAndYear.innerHTML = months[month]+" "+year;
		let date=1;
		for(let i=0;i<6;i++){
			let row = document.createElement("tr");
			for(let  j=0; j<7; j++){
				if(i === 0 && j<firstDay){
					let cell = document.createElement("td");
					cell.className = "no-day";
					let cellText = document.createTextNode("");
					cell.appendChild(cellText);
					row.appendChild(cell);
				}else if(date>daysInMonth){
					break; 
				}else{
					
					let cell = document.createElement("td");
					cell.setAttribute("data-id", date+"/"+currentMonth+"/"+currentYear);
					cell.setAttribute("data-month-days", daysInMonth)
					
					if(date == todaysDate){
						cell.className = "today";
					}else{
						cell.className = "day";
					}
					let cellText = document.createTextNode(date);
					cell.appendChild(cellText);
					row.appendChild(cell);
					date++;	
				}
			}
			tbl.appendChild(row);
		}
					
	}
	function previous(){
		currentYear = (currentMonth === 0)? currentYear - 1: currentYear;
		currentMonth = currentMonth === 0? 11: currentMonth - 1;
		showCalendar(currentMonth, currentYear)
	}
	function next(){
		currentYear = currentMonth === 11 ? currentYear + 1: currentYear;
		currentMonth = (currentMonth + 1) % 12;
		showCalendar(currentMonth, currentYear);				
	}
	function getCheckboxTotals(){
		let array = [];
		var count = 0;
		 var checks = document.getElementsByClassName('checks');
		 var str;
		 for(i=0;i<checks.length;i++){
			 if(checks[i].checked === true){
				 str+=checks[i].value;
				 array.push(Number(checks[i].value));
			 }
		 }
		for(var i=0;i<array.length;i++){
			count+= array[i];
		}
		return count;
	 }
	 function getCheckboxTotalsTwo(){
		let array = [];
		var count = 0;
		 var checks = document.getElementsByClassName('checks-two');
		 var str;
		 for(i=0;i<checks.length;i++){
			 if(checks[i].checked === true){
				 str+=checks[i].value;
				 array.push(Number(checks[i].value));
			 }
		 }
		for(var i=0;i<array.length;i++){
			count+= array[i];
		}
		return count;
	 }
		 
window.onload = function(){
	showCalendar(currentMonth, currentYear);

	_("previousMonth").addEventListener("click", function(){previous();});
	_("nextMonth").addEventListener("click", function(){next();});
	_("open-booking").addEventListener("click", function(){
		_("popup").style.display = "block";
	});
	getHref();
				document.addEventListener("click", function(e){
					var objectArray =[];
					var cumulate;
					var monthDays = _("month-days").value;
					var costPerDay = 1200;
					console.log(localStorage.getItem("day-in-month"));
					var daysinMonth = localStorage.getItem("day-in-month");
					console.log(daysinMonth); 
					var numberHrs = _("numberHrs").value;
					console.log(numberHrs);
					var checkBoxTotals = getCheckboxTotals() * monthDays;
					var checkBoxTotalDay = getCheckboxTotalsTwo();
					console.log(checkBoxTotalDay)
					//console.log(checkBoxTotals * monthDays);
					var costPerMonth = monthDays * costPerDay + checkBoxTotals;
					var totalCostPerDay = (costPerDay * numberHrs) + checkBoxTotalDay;
					if(hasClass(e.target, "calculate-me")){
						_("total").innerHTML = costPerMonth;	
					}
					if(hasClass(e.target, "day") || hasClass(e.target, "today")){
						console.log(e.target.getAttribute("data-id"));
						_("popup-two").style.display = "block";
						_("when").innerHTML = e.target.getAttribute("data-id");
						localStorage.setItem("day-in-month", e.target.getAttribute("data-month-days"))
					}
					if(hasClass(e.target, "calculate-me-two")){
						_("total2").innerHTML = totalCostPerDay;
					}
				}, true);

}