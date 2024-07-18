document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch('/api/mycourses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching courses');
        }

        const { courses } = await response.json();
        const coursesContainer = document.getElementById('courses');

        if (courses.length === 0) {
            coursesContainer.innerHTML = '<p>No courses found</p>';
        } else {
            courses.forEach(course => {
                
                const courseElement = document.createElement('div');
                courseElement.classList.add('course');
                courseElement.innerHTML = `
                    <h3>${course.courseName}</h3>
                    <p>${course.description}</p>
                    <div class="button-container">
                        <button class="view">View Attendance</button>
                    </div>
                `;

                const viewButton = courseElement.querySelector('.view');

                viewButton.addEventListener('click', async function () {
                    const cId = { courseId: course.courseCode };
                    console.log(cId);

                    const setResponse = await fetch(`/api/view`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(cId)
                    });

                    if (!setResponse.ok) {
                        throw new Error('Error fetching user data');
                    }

                    console.log('hahah3');

                    const sentCode = await setResponse.json();
                    console.log('hahah4', sentCode);

                    window.location.href = `/view`;
                });

                coursesContainer.appendChild(courseElement);
            });
        }
    } catch (error) {
        console.error(error);
    }
});
