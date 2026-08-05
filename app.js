let themes = {};

fetch('themes.csv')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        for(let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;

            const [name, background, rule, color] = lines[i].split(',');
            themes[name.trim()] = [background.trim(), rule.trim(), color.trim()];
        }
    })

themes["custom"] = ["lavender", "plum", "black"]

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

document.getElementById('theme').addEventListener('change', function() {
    const theme = document.getElementById('theme').value;
    document.getElementById('background-color-personalization').value = themes[theme][0];
    document.getElementById('horizontal-rule-personalization').value = themes[theme][1];
    document.getElementById('text-color-personalization').value = themes[theme][2];

    if (theme === 'custom') {
        document.getElementById('background-color-personalization').disabled = false;
        document.getElementById('horizontal-rule-personalization').disabled = false;
        document.getElementById('text-color-personalization').disabled = false;
    }
    else {
        document.getElementById('background-color-personalization').disabled = true;
        document.getElementById('horizontal-rule-personalization').disabled = true;
        document.getElementById('text-color-personalization').disabled = true;
    }
});

document.getElementById('startform').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('startform').style.display = 'none';
    document.getElementById('background-color-personalization').disabled = false;
    document.getElementById('horizontal-rule-personalization').disabled = false;
    document.getElementById('text-color-personalization').disabled = false;

    const formData = new FormData(document.getElementById('teacher_setup'));
    const honorific = formData.get('honorific');
    localStorage.setItem('honorific', honorific.toString());
    const teacher_name = formData.get('teacher_name');
    localStorage.setItem('teacher_name', teacher_name.toString());
    const isBirthday = formData.get('birthday');
    const birthdayStudent = formData.get('birthdayStudent');
    const themeSelection = formData.get('theme');
    const backgroundColorChoice = formData.get('background-color-personalization');
    const horizontalRuleColor = formData.get('horizontal-rule-personalization');
    const textColorChoice = formData.get('text-color-personalization');

    if (themeSelection !== 'custom') {
        document.getElementById('background-color-personalization').disabled = true;
        document.getElementById('horizontal-rule-personalization').disabled = true;
        document.getElementById('text-color-personalization').disabled = true;
    }

    if (themeSelection === 'custom') {
        localStorage.setItem('background', backgroundColorChoice.toString());
        themes["custom"][0] = backgroundColorChoice.toString();
        localStorage.setItem('horizontal-rule', horizontalRuleColor.toString());
        themes["custom"][1] = horizontalRuleColor.toString();
        localStorage.setItem('text-color', textColorChoice.toString());
        themes["custom"][2] = textColorChoice.toString();
    }

    document.getElementById('classroom').innerHTML = `${honorific} ${teacher_name}'s Class`;
    document.getElementById('happybirthday').innerHTML = `Happy Birthday, ${birthdayStudent}!`
    document.getElementById('site').style.backgroundColor = backgroundColorChoice.toString();
    document.getElementById('classroom').style.color = textColorChoice.toString();
    document.getElementById('happybirthday').style.color = textColorChoice.toString();
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
const loadTextColor = localStorage.getItem('text-color');

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
    themes["custom"][0] = loadBackground;
}

if (loadhr) {
    themes["custom"][1] = loadhr;
}

if (loadTextColor) {
    themes["custom"][2] = loadTextColor;
}

document.getElementById('resetBtn').addEventListener('click', function() {
    localStorage.clear();
    alert('Saved preferences have been reset.');
    window.location.reload();
});