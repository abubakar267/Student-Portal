document.addEventListener('DOMContentLoaded', async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`/api/fee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });



        const data = await response.json();



        const fee = data.fee;
        const courses = data.courses;
        const name = data.name;
        const rate = data.creditHourRate


       

       
        if(data.error){
            const errorMsg = document.createElement('div');
            errorMsg.innerText = 'Fee challan not generated';
            errorMsg.style.color = 'red';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.marginTop = '20px';
            
            const container = document.getElementsByClassName("container")[0];
            container.appendChild(errorMsg);
        }else{

            document.getElementById('challan-date').innerText = new Date().toLocaleDateString();


            document.getElementById('student-name').innerText = name; // Replace with actual student name
            document.getElementById('student-id').innerText = courses[0].studentId // Replace with actual student ID
    
            // Populate the courses
            const coursesList = document.getElementById('courses-list');
            courses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.courseCode}</td>
                    <td>${course.courseName}</td>
                    <td>${course.creditHours}</td>
                    <td>${rate}</td> 
                    <td>${course.creditHours * rate}</td>
                `;
                coursesList.appendChild(row);
            });
    
            // Populate the total fee
            document.getElementById('total-fee').innerText = `PKR ${fee}`;
    

        }

        // Populate the date
      
        // Populate the student info (assuming you have this info)
       
    } catch (error) {
        console.error("Error:", error);
    }
});

function printChallan() {
    window.print();
}
