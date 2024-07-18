document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        // Fetch user data
        const mycourseResponse = await fetch('/api/attendance', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!mycourseResponse.ok) {
            throw new Error('Error fetching user data');
        }

        const mycourses = await mycourseResponse.json();
        const courseList = document.getElementById("course-list");

        mycourses.courses.forEach((element) => {
            // Create course item container
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");

            // Course title
            const courseTitle = document.createElement("div");
            courseTitle.classList.add("course-title");
            courseTitle.textContent = `${element.courseCode} ${element.courseName}`;
            courseItem.appendChild(courseTitle);

            // View Students button
            const viewStudentsButton = document.createElement("button");
            viewStudentsButton.classList.add("view-button");
            viewStudentsButton.textContent = "View Students";
            viewStudentsButton.addEventListener('click', async function() {
                const data = {
                    courseCode: element.courseCode
                };
                try {
                    const sendCode = await fetch('/api/students', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    });

                    if (!sendCode.ok) {
                        throw new Error('Error fetching user data');
                    }

                    const result = await sendCode.json();
                    console.log('Success:', result);
                    location.href = `/studentAttendance`;
                } catch (error) {
                    console.log(error);
                }
            });
            courseItem.appendChild(viewStudentsButton);

            // Append course item to the list
            courseList.appendChild(courseItem);
        });

    } catch (error) {
        console.error(error);
    }
});
