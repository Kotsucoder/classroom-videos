// document.getElementById('submit').addEventListener('click', function() {
//     document.getElementById('startform').style.display = 'none';
// });

document.getElementById('config').addEventListener('click', function() {
    document.getElementById('startform').style.display = 'grid';
});

document.getElementById('birthdayYes').addEventListener('change', function() {
    if (document.getElementById('birthdayYes').checked) {
        document.getElementById('birthdayStudentField').classList.remove('hidden');
        document.getElementById('birthdayStudent').required = true;
    }
});

document.getElementById('birthdayNo').addEventListener('change', function() {
    if (document.getElementById('birthdayNo').checked) {
        document.getElementById('birthdayStudentField').classList.add('hidden');
        document.getElementById('birthdayStudent').required = false;
    }
});

document.getElementById('startform').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('startform').style.display = 'none';

    const formData = new FormData(document.getElementById('teacher_setup'));
    const honorific = formData.get('honorific');
    localStorage.setItem('honorific', honorific.toString());
    const teacher_name = formData.get('teacher_name');
    localStorage.setItem('teacher_name', teacher_name.toString());
    const isBirthday = formData.get('birthday');
    const birthdayStudent = formData.get('birthdayStudent');
    const backgroundColorChoice = formData.get('background-color-personalization');
    localStorage.setItem('background', backgroundColorChoice.toString());
    const horizontalRuleColor = formData.get('horizontal-rule-personalization');
    localStorage.setItem('horizontal-rule', horizontalRuleColor.toString());

    document.getElementById('classroom').innerHTML = `${honorific} ${teacher_name}'s Class`;
    document.getElementById('happybirthday').innerHTML = `Happy Birthday, ${birthdayStudent}!`
    document.getElementById('site').style.backgroundColor = backgroundColorChoice.toString();
    const allRules = document.querySelectorAll('hr');
    allRules.forEach(rule => {
        rule.style.borderTop = `4px dashed ${horizontalRuleColor}`;
    });

    if (isBirthday === 'yes') {
        document.getElementById('birthday').classList.remove('hidden');
    }
    else {
        document.getElementById('birthday').classList.add('hidden');
    }
});

const loadHonorific = localStorage.getItem('honorific');
const loadName = localStorage.getItem('teacher_name');
const loadBackground = localStorage.getItem('background');
const loadhr = localStorage.getItem('horizontal-rule');

if (loadHonorific) {
    // Find the radio button with the matching value and check it
    const radioToSelect = document.querySelector(`input[name="honorific"][value="${loadHonorific}"]`);
    if (radioToSelect) {
        radioToSelect.checked = true;
    }
}

if (loadName) {
    document.getElementById('teacher_name').value = loadName;
}

if (loadBackground) {
    document.getElementById('background-color-personalization').value = loadBackground;
}

if (loadhr) {
    document.getElementById('horizontal-rule-personalization').value = loadhr;
}

document.getElementById('resetBtn').addEventListener('click', function() {
    localStorage.clear();
    alert('Saved preferences have been reset.');
    window.location.reload();
});