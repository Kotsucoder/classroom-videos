document.getElementById('submit').addEventListener('click', function() {
    document.getElementById('startform').style.display = 'none';
});

document.getElementById('config').addEventListener('click', function() {
    document.getElementById('startform').style.display = 'grid';
});

document.getElementById('birthdayYes').addEventListener('change', function() {
    if (document.getElementById('birthdayYes').checked) {
        document.getElementById('birthdayStudentField').classList.remove('hidden');
    }
});

document.getElementById('birthdayNo').addEventListener('change', function() {
    if (document.getElementById('birthdayNo').checked) {
        document.getElementById('birthdayStudentField').classList.add('hidden');
    }
});