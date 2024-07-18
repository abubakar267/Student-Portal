document.addEventListener('DOMContentLoaded', async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }





        const response = await fetch(`/api/view`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching course');
        }

        const data= await response.json();
        console.log('attendance data',data);

        
        const tableBody = document.getElementById('attendance-table-body');
        data.forEach(attendance => {
            const row = document.createElement('tr');
            const dateCell = document.createElement('td');
            const statusCell = document.createElement('td');
            const formattedDate = new Date(attendance.date).toLocaleDateString('en-CA'); // Format to YYYY-MM-DD
            
            dateCell.textContent = formattedDate ;
            statusCell.textContent = attendance.status;
            if(attendance.status == "Present"){
                statusCell.style.backgroundColor = "#9bd192"
            }else if(attendance.status == "Absent"){
                statusCell.style.backgroundColor = "#e06767"
            }else{
                statusCell.style.backgroundColor = "#9fbae3"
            }
            

            row.appendChild(dateCell);
            row.appendChild(statusCell);

            tableBody.appendChild(row);
        });

  
            


        }
     catch (error) {
        console.error("error is hh", error);
    }
});
