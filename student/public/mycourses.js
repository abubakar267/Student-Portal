document.addEventListener('DOMContentLoaded', async function() {
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
                        <button class="view">View Details</button>
                        <button class="drop">Drop Course</button>
                        <button class="mark">View Marks</button>
                    </div>
                `;

                const viewButton = courseElement.querySelector('.view');
                const dropButton = courseElement.querySelector('.drop');
                const markButton = courseElement.querySelector('.mark');

                console.log(course._id);

                viewButton.addEventListener('click', async function() {

                    try{
                    // window.location.href = `/course/${course._id}`;
                    console.log(course._id);
                    
                    const response = await fetch(`/api/course/${course._id}`, {
                        method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });

                    if (!response.ok) {
                         throw new Error('Error fetching course');
                        }

                    const { mycourse } = await response.json();
                    console.log(mycourse);

                    const detailContainer = document.getElementById('detailContainer');
                    detailContainer.innerHTML =  `
                        <h2></h2>
                        <br>
                        <p>Course Code : ${mycourse.courseCode}</p>
                        <p>Course Name : ${mycourse.courseName}</p>
                        <p>Course Description : ${mycourse.creditHours} </p>
                        <p>Course Credit Hours : ${mycourse.description}</p>
                        <p>Student ID : ${mycourse.studentId}</p>
                        <p>Teacher ID : ${mycourse.teacherId} </p> 
                    `

                    // Show the modal
                    const modal = document.getElementById('detailModal');
                    modal.style.display = 'block';

                    // Close the modal when the close button is clicked
                    const closeButton = document.querySelector('.close2');
                    closeButton.addEventListener('click', () => {
                        console.log('close clicked');
                        modal.style.display = 'none';
                    });

                    // Close the modal when clicking outside of the modal content
                    window.addEventListener('click', (event) => {
                        if (event.target === modal) {
                            modal.style.display = 'none';
                        }
                    });

                    }catch(error){
                        console.log(error);
                    }
                });

                dropButton.addEventListener('click', async function() {
                    try {
                        const dropResponse = await fetch(`/api/course/${course._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        }); 
                        if (!dropResponse.ok) {
                            throw new Error('Failed to drop course');
                        }
                        const droppedCourse = await dropResponse.json();
                        console.log('Course dropped successfully', droppedCourse);
                        location.reload()
                    } catch (error) {
                        console.log(error);
                    }
                });

                markButton.addEventListener('click', async function() {
                    const markResponse = await fetch(`/api/mycourses/${course._id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!markResponse.ok) {
                        throw new Error('Error fetching marks');
                    }

                    const {marks} = await markResponse.json();
                    console.log('Marks fetched successfully', marks);
                    const marksContainer = document.getElementById('marksContainer');
                    marksContainer.innerHTML =  `
                        <h2>${marks.courseCode}</h2>
                        <br>
                        <p>Marks : ${marks.obtainedMarks} / ${marks.totalMarks}</p>
                        
                    `

                    // Show the modal
                    const modal = document.getElementById('marksModal');
                    modal.style.display = 'block';

                    // Close the modal when the close button is clicked
                    const closeButton = document.querySelector('.close');
                    closeButton.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });

                    // Close the modal when clicking outside of the modal content
                    window.addEventListener('click', (event) => {
                        if (event.target === modal) {
                            modal.style.display = 'none';
                        }
                    });

                    
                });

                coursesContainer.appendChild(courseElement);
            });
        }
    } catch (error) {
        console.error(error);
    }
});
