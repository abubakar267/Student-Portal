document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        // Fetch user data
        const studentResponse = await fetch('/api/auth/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!studentResponse.ok) {
            throw new Error('Error fetching user data');
        }

        const { student } = await studentResponse.json();
        const studentInfo = document.getElementById('studentInfo');
        studentInfo.innerHTML = `<h2>Welcome, ${student.name}!</h2>`;
    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('attendance').addEventListener('click', function() {
        location.href = '/attendance';
    });

    document.getElementById('courses').addEventListener('click', function() {
        location.href = '/mycourses';
    });

    document.getElementById('fee-challan').addEventListener('click', function() {
        location.href = '/fee';
    });

    document.getElementById('transcript').addEventListener('click', function() {
        location.href = '/transcript';
    });

    document.getElementById('register-course').addEventListener('click', function() {
        location.href = '/registerCourse';
    });
});
