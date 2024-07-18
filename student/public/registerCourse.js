document.addEventListener('DOMContentLoaded', async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        console.log('test1');

        const response = await fetch(`/api/registerCourse`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching course');
        }

        const data = await response.json();
        const { courseNames, courseCodes, courseDescription, creditHours } = data;
        console.log(courseNames, courseCodes, courseDescription);

        const availableCourses = document.getElementById("available-courses");
        courseCodes.forEach((courseCode, index) => {
            const listItem = document.createElement("div");
            const alert = document.createElement("div");
            alert.style.width = "2px"
            alert.style.height = "2px"
            alert.style.position = "relative"
            alert.style.top = "5px"
            alert.style.border = "none";
            alert.style.boxShadow = "none";
            alert.setAttribute("id","alert");
            const regBtn = document.createElement("button");
            regBtn.textContent = "Register";
            regBtn.setAttribute("id", `${courseCode}`);
            listItem.textContent = `${courseCode} ${courseNames[index]}`;

            //...............................................
            const flexContainer = document.createElement("div");
            flexContainer.style.display = "flex";
            flexContainer.style.width = "200px";
            flexContainer.style.border = "none";
            flexContainer.style.boxShadow = "none";
            flexContainer.setAttribute("id", "btnparent");
            flexContainer.style.alignItems = "center";
            flexContainer.appendChild(alert);
            flexContainer.appendChild(regBtn);
            //...............................................


            listItem.appendChild(flexContainer);
            availableCourses.appendChild(listItem);

            regBtn.addEventListener("click", async function() {
                const clickedCourse = regBtn.getAttribute("id");
                console.log(clickedCourse);
                const creditHour = creditHours[index];
                const response2 = await fetch(`/api/registerCourse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: courseNames[index],
                        code: courseCode,
                        description: courseDescription[index],
                        creditHours: creditHour
                    })
                });

                if (!response2.ok) {
                    const response2error = await response2.json();
                    console.log(response2error.status);
                    if(!response2error.status){
                        alert.style.backgroundColor = "blue";
                        alert.classList.add("blink-blue");

                        alert.addEventListener('animationend', function() {
                            alert.classList.remove("blink-blue");
                            alert.style.backgroundColor = ""; // Reset background color
                        })
                        
                        //change available to already registered :()
                    }else if(response2error.status === "NA"){
                        alert.style.backgroundColor = "red";
                        alert.classList.add("blink-red");

                        alert.addEventListener('animationend', function() {
                            alert.classList.remove("blink-red");
                            alert.style.backgroundColor = ""; // Reset background color
                        })
                    }
                    throw new Error(response2error.message || 'Failed to register course');
                }

                const response2Data = await response2.json();
                console.log('Course registration successful:', response2Data);
                alert.style.backgroundColor = "green";
                        alert.classList.add("blink-green");

                        alert.addEventListener('animationend', function() {
                            alert.classList.remove("blink-green");
                            alert.style.backgroundColor = ""; // Reset background color
                        })
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
});
