document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        // Fetch user data
        const teacherResponse = await fetch('/api/enroll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!teacherResponse.ok) {
            throw new Error('Error fetching user data');
        }

        const { courseNames, courseCodes, teacherId, courseDescriptions, creditHours } = await teacherResponse.json();
        console.log(courseNames);

        const availableCourses = document.getElementById("available-courses");
        courseCodes.forEach((courseCode, index) => {
            const listItem = document.createElement("div");
            const alert = document.createElement("div");
            alert.style.width = "2px";
            alert.style.height = "2px";
            alert.style.position = "relative";
            alert.style.top = "5px";
            alert.style.border = "none";
            alert.style.boxShadow = "none";
            alert.setAttribute("id", "alert");
            const regBtn = document.createElement("button");
            regBtn.textContent = "Register";
            regBtn.setAttribute("id", `${courseCode}`);
            listItem.textContent = `${courseCode} ${courseNames[index]}`;

            const flexContainer = document.createElement("div");
            flexContainer.style.display = "flex";
            flexContainer.style.width = "200px";
            flexContainer.style.border = "none";
            flexContainer.style.boxShadow = "none";
            flexContainer.setAttribute("id", "btnparent");
            flexContainer.style.alignItems = "center";
            flexContainer.appendChild(alert);
            flexContainer.appendChild(regBtn);

            listItem.appendChild(flexContainer);
            availableCourses.appendChild(listItem);

            regBtn.addEventListener("click", async () => {
                const clickedCourse = regBtn.getAttribute("id");
                console.log(clickedCourse);
                const courseName = courseNames[index];
                const creditHour = creditHours[index];
                const courseDescription = courseDescriptions[index];

                console.log(courseName);
                console.log(teacherId);

                const teacherResponse2 = await fetch('/api/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ clickedCourse, courseName, teacherId, courseDescription, creditHour })
                });

                const response2Data = await teacherResponse2.json();
                // if (!teacherResponse2.ok) {
                     console.log('Error:', response2Data.message,response2Data.status);
                     if(response2Data.status === "done"){
                     alert.style.backgroundColor = "green";
                        alert.classList.add("blink-green");

                        alert.addEventListener('animationend', function() {
                            alert.classList.remove("blink-green");
                            alert.style.backgroundColor = ""; // Reset background color
                        })}else if(response2Data.status === "already"){

                            alert.style.backgroundColor = "blue";
                        alert.classList.add("blink-blue");

                        alert.addEventListener('animationend', function() {
                            alert.classList.remove("blink-blue");
                            alert.style.backgroundColor = ""; // Reset background color

                        })}else{
                            alert.style.backgroundColor = "red";
                            alert.classList.add("blink-red");
    
                            alert.addEventListener('animationend', function() {
                                alert.classList.remove("blink-red");
                                alert.style.backgroundColor = ""; // Reset background color
                        })
                //     // alert(`Error: ${response2Data.message}`);
                // } else {
                //     console.log('Course registration successful:', response2Data);
                //     // alert(`Status: ${response2Data.status}`);
                // }
                    }
            });
        });

    } catch (error) {
        console.log(error);
    }
});
