var CONTENT = {
    'open_in_new_window': {
        'en-gb': 'link opens in new tab',
        'cy-gb': "dolen yn agor mewn tab newydd"
    },
    'satisfactionIntro': {
        'en-gb': 'of students were satisfied overall with their course.',
        'cy-gb': "cyfran y myfyrwyr a oedd yn fodlon â'u cwrs ar y cyfan."
    },
    'question_23': {
        'en-gb': "say staff value students views and opinions about the course",
        'cy-gb': "yn dweud bod staff yn gwerthfawrogi sylwadau a barn myfyrwyr am y cwrs",
    },
    'explanationIntro': {
        'en-gb': 'of students say teaching staff have supported their learning well.',
        'cy-gb': "o fyfyrwyr yn dweud bod staff addysgu wedi cefnogi eu dysgu yn dda."
    },
    'workIntro': {
        'en-gb': 'in work or doing further study 15 months after the course.',
        'cy-gb': "yn symud ymlaen i weithio ac/neu astudio o fewn 15 mis ar ôl y cwrs"
    },
    'ctaLead1': {
        'en-gb': 'For ',
        'cy-gb': 'Am '
    },
    'ctaLead2': {
        'en-gb': 'more',
        'cy-gb': 'fwy'
    },
    'ctaLead3': {
        'en-gb': ' official course information visit Discover Uni',
        'cy-gb': ' o wybodaeth swyddogol am y cwrs, ewch i Darganfod Prifysgol'
    },
    'logo': {
        'en-gb': '{{domain_name}}/static/images/logos/widget_logo_english.svg',
        'cy-gb': '{{domain_name}}/static/images/logos/widget_logo_welsh.svg'
    },
    'logoAlt': {
        'en-gb': 'DiscoverUni',
        'cy-gb': 'Darganfod Prifysgol'
    },
    'cta': {
        'en-gb': 'See course data',
        'cy-gb': "Gweld data'r cwrs"
    },
    'noDataIntro': {
        'en-gb': 'To see official information about this course and others visit Discover Uni.',
        'cy-gb': 'I weld gwybodaeth swyddogol am y cwrs hwn a chyrsiau eraill, ewch i Darganfod y Brifysgol.'
    },
    'noDataCtaLead1': {
        'en-gb': 'Make an ',
        'cy-gb': 'Dewis '
    },
    'noDataCtaLead2': {
        'en-gb': 'informed',
        'cy-gb': 'yn'
    },
    'noDataCtaLead3': {
        'en-gb': ' choice.',
        'cy-gb': ' ddeallus.'
    },
    'noDataCta': {
        'en-gb': 'See course info',
        'cy-gb': 'Gweld gwybodaeth y cwrs'
    },
    'placement': {
        'en-gb': 'Placement year',
        'cy-gb': 'Blwyddyn ar leoliad'
    },
    'placementOptional': {
        'en-gb': 'Placement year optional',
        'cy-gb': 'Blwyddyn ar leoliad yn ddewisol'
    },
    'foundation': {
        'en-gb': 'Foundation year',
        'cy-gb': 'Blwyddyn sylfaen'
    },
    'foundationOptional': {
        'en-gb': 'Foundation year optional',
        'cy-gb': 'Blwyddyn sylfaen yn ddewisol'
    },
    'abroad': {
        'en-gb': 'Year abroad',
        'cy-gb': 'Blwyddyn dramor'
    },
    'abroadOptional': {
        'en-gb': 'Year abroad optional',
        'cy-gb': 'Blwyddyn dramor yn ddewisol'
    },
    'dataFor': {
        'en-gb': 'Data for ',
        'cy-gb': 'Data ar gyfer '
    },
    'dataForAggregated': {
        'en-gb': 'Data for courses in ',
        'cy-gb': 'Data ar gyfer cyrsiau '
    },
    'at': {
        'en-gb': ' at ',
        'cy-gb': ' yn '
    },
    'overTwoYears': {
        'en-gb': 'over two years',
        'cy-gb': 'dros ddwy flynedd'
    },
    'FullTime': {
        'en-gb': 'Full time',
        'cy-gb': 'Llawn-amser'
    },
    'PartTime': {
        'en-gb': 'Part time',
        'cy-gb': 'Rhan-amser'
    }
}


var MODES = {
    'fulltime': 1,
    'parttime': 2,
}

var MODE_KEYS = {
    'fulltime': 'FullTime',
    'parttime': 'PartTime',
}

const BASE_URL = "https://www.discoveruni.gov.uk"

var LANGUAGE_KEYS = {
    'en-gb': 'english',
    'cy-gb': 'welsh'
}

var MINIMUM_RESPONSIVE_HORIZONTAL_WIDTH = 614;

var DiscoverUniWidget = function (targetDiv) {
    this.targetDiv = targetDiv;
    this.setup();
}

DiscoverUniWidget.prototype = {
    setup: function () {
        this.institution = this.targetDiv.dataset.institution;
        this.course = this.targetDiv.dataset.course;
        this.kismode = this.targetDiv.dataset.kismode ? MODE_KEYS[this.targetDiv.dataset.kismode.toLowerCase()] : 'FullTime';
        this.orientation = this.targetDiv.dataset.orientation ? this.targetDiv.dataset.orientation.toLowerCase() : 'vertical';
        this.language = this.targetDiv.dataset.language ? this.targetDiv.dataset.language.toLowerCase() : 'en-gb';
        this.languageKey = LANGUAGE_KEYS[this.language];
        this.size = this.targetDiv.dataset.size;

        this.targetDiv.classList.add(this.orientation);
        if (this.orientation === 'responsive') {
            this.handleResponsive();
        }

        this.addCss();
        this.loadCourseData();
    },

    handleResponsive: function () {
        if (this.inIframe()) {
            if (window.innerWidth > MINIMUM_RESPONSIVE_HORIZONTAL_WIDTH) {
                this.targetDiv.classList.add('horizontal');
            } else {
                this.targetDiv.classList.add('vertical');
            }
        } else {
            if (this.targetDiv.clientWidth > MINIMUM_RESPONSIVE_HORIZONTAL_WIDTH) {
                this.targetDiv.classList.add('horizontal');
            } else {
                this.targetDiv.classList.add('vertical');
            }
        }
    },

    inIframe: function () {
        try {
            return window.location !== window.parent.location;
        } catch (e) {
            return true;
        }
    },

    addCss: function () {
        var logoFontNode = document.createElement('link');
        logoFontNode.href = "https://fonts.googleapis.com/css?family=Montserrat:regular,bold&display=swap";
        logoFontNode.rel = "stylesheet";
        logoFontNode.type = "text/css";
        var generalFontNode = document.createElement('link');
        generalFontNode.href = "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@500;600;800&display=swap";
        generalFontNode.rel = "stylesheet";
        generalFontNode.type = "text/css";
        styling = "{{styles}}";
        var stylingNode = document.createElement('style');
        var stylingTextNode = document.createTextNode(styling);
        stylingNode.appendChild(stylingTextNode);
        var widgetScript = document.getElementById('unistats-widget-script');
        widgetScript.parentNode.insertBefore(stylingNode, widgetScript);
        widgetScript.parentNode.insertBefore(logoFontNode, widgetScript);
        widgetScript.parentNode.insertBefore(generalFontNode, widgetScript);
    },

    loadCourseData: function () {
        var that = this;
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", function () {
            that.renderWidget(this.status, this.response);
        });
        base_url = "{{api_domain}}/institutions/{{uni_id}}/courses/{{course_id}}/modes/{{mode}}";
        url = base_url.replace('{{uni_id}}', this.institution);
        url = url.replace('{{course_id}}', this.course);
        url = url.replace('{{mode}}', MODES[this.kismode.toLowerCase()]);

        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Ocp-Apim-Subscription-Key', '{{api_key}}');
        xhttp.send();
    },

    renderWidget: function (status, response) {
        if (status === 200) {
            var courseData = JSON.parse(response).data;
            let link = this.generateLink(courseData)
            if (this.hasRequiredStats(courseData) && courseData["multiple_subjects"] === false) {
                new DataWidget(this.targetDiv, courseData, this.language, this.languageKey, this.kismode,
                    this.hasOverallSatisfactionStats, this.hasTeachingSatisfactionStats, this.hasWorkStats,
                    link);
            } else {
                new NoDataWidget(this.targetDiv, courseData.course_name, courseData.institution_name, this.language,
                    this.languageKey, this.kismode, link);
            }
        } else {
            new NoDataWidget(this.targetDiv, "", "", this.language, this.languageKey, this.kismode,
                BASE_URL);
        }
    },

    setOverallSatisfactionStats: function (nssStats) {
        let question = false;
        if (nssStats[0].question_23) {
            if ('agree_or_strongly_agree' in nssStats[0].question_23) {
                question = nssStats[0].question_23
            }
        }
        if (nssStats[0].question_28) {
            if ('agree_or_strongly_agree' in nssStats[0].question_28) {
                question = nssStats[0].question_28
            }
        }

        this.hasOverallSatisfactionStats = Boolean(nssStats && nssStats[0] && question);
    },

    setTeachingSatisfactionStats: function (nssStats) {
        let question = false;
        if (nssStats[0].question_16) {
            if ('agree_or_strongly_agree' in nssStats[0].question_16) {
                question = nssStats[0].question_16
            }
        }
        this.hasTeachingSatisfactionStats = Boolean(nssStats && nssStats[0] && question);
    },

    setWorkStats: function (workStats) {
        this.hasWorkStats = Boolean(workStats && workStats[0] && workStats[0].in_work_or_study);
    },

    hasRequiredStats: function (courseData) {

        this.setOverallSatisfactionStats(courseData.statistics.nss)
        this.setTeachingSatisfactionStats(courseData.statistics.nss)
        this.setWorkStats(courseData.statistics.employment)
        return Boolean(courseData && courseData.statistics &&
            Boolean(this.hasOverallSatisfactionStats || this.hasTeachingSatisfactionStats || this.hasWorkStats));
    },

    generateLink: function (courseData) {
        let base_domain = BASE_URL;
        if (this.languageKey === 'welsh') {
            base_domain += '/cy';
        }

        return `${base_domain}/course-details/${courseData.pub_ukprn}/${this.course}/${this.kismode}/`;
    }
}

var DataWidget = function (targetDiv, courseData, language, languageKey, kismode, hasOverall, hasTeaching, hasWork,
                           generateLink) {
    this.targetDiv = targetDiv;
    this.courseData = courseData;
    this.language = language;
    this.languageKey = languageKey;
    this.kismode = kismode;
    this.hasOverall = hasOverall;
    this.hasTeaching = hasTeaching;
    this.hasWork = hasWork;
    this.generateLink = generateLink;
    this.setup();
}

DataWidget.prototype = {
    setup: function () {
        this.slideIndex = 0;
        this.timeout = 0;
        this.renderDataLead();
        this.renderCTABlock();
    },

    renderDataLead: function () {
        var leadNode = document.createElement('div');
        leadNode.classList.add('ofsKisClear');
        leadNode.classList.add('kis-widget__lead');
        if (this.hasOverall) {
            leadNode.appendChild(this.renderSatisfactionSlide());
        }
        if (this.hasTeaching) {
            leadNode.appendChild(this.renderExplanationSlide());
        }
        if (this.hasWork) {
            leadNode.appendChild(this.renderWorkSlide());
        }

        this.targetDiv.appendChild(leadNode);
        this.carousel();
    },

    createSlideNode: function (idName, statNode, aggregation_level, subject, courseName) {
        var slideNode = document.createElement('div');
        slideNode.classList.add('ofsKisClear');
        slideNode.classList.add('kis-widget__lead-slide', 'kis-widget__fade');
        slideNode.id = idName;
        var slideSurroundNode = document.createElement('div');
        slideSurroundNode.classList.add('ofsKisClear');
        slideSurroundNode.classList.add('kis-widget__lead-surround-stat');
        slideNode.appendChild(slideSurroundNode);

        slideSurroundNode.appendChild(statNode);
        slideSurroundNode.appendChild(this.renderCourseDetails(aggregation_level, subject, courseName));

        return slideNode;
    },

    createStatNode: function (titleNode, introNode) {
        var statNode = document.createElement('p');
        statNode.classList.add('ofsKisClear');
        statNode.classList.add('kis-widget__stat');
        statNode.style.margin = "0";
        statNode.appendChild(titleNode);
        statNode.appendChild(introNode);

        return statNode;
    },

    createTitleNode: function (titleText) {
        var titleNode = document.createElement('span');
        titleNode.classList.add('ofsKisClear');
        titleNode.classList.add('kis-widget__title');
        var title = document.createTextNode(titleText);
        titleNode.appendChild(title);
        return titleNode;
    },

    createIntroNode: function (introText) {
        var introNode = document.createElement("span");
        introNode.classList.add('ofsKisClear');
        introNode.classList.add('kis-widget__intro');
        var intro = document.createTextNode(introText);
        introNode.appendChild(intro);
        return introNode;
    },

    renderSatisfactionSlide: function () {
        const nssData = this.courseData.statistics.nss[0]
        let aggregation_level = nssData.aggregation_level;
        let courseName = this.courseData.course_name[this.languageKey];
        if (typeof courseName === 'undefined') {
            courseName = this.courseData.course_name['english'];
        }
        const aggregation_lookup = [11, 12, 13, 21, 22, 23]
        let subject
        if (aggregation_lookup.includes(aggregation_level)) {
            if (this.language === "cy-gb") {
                subject = nssData.subject.welsh_label;
            } else {
                subject = nssData.subject.english_label;
            }
        } else {
            subject = courseName;
        }
        let percentage
        let introText

        // England
        if (this.courseData.country.code == 'XF') {
            percentage = nssData.question_23.agree_or_strongly_agree + '%';
            introText = CONTENT.question_23[this.language];
        }
        // Not England
        else {
            percentage = nssData.question_28.agree_or_strongly_agree + '%';
            introText = CONTENT.satisfactionIntro[this.language];
            aggregation_level = nssData.nss_country_aggregation_level
        }

        let statNode = this.createStatNode(this.createTitleNode(percentage), this.createIntroNode(introText));

        let slideNode = this.createSlideNode('satisfaction', statNode, aggregation_level, subject, courseName);
        slideNode.ariaLabel = `${percentage} ${introText}`
        return slideNode;
    },

    renderExplanationSlide: function () {
        var aggregation_level = this.courseData.statistics.nss[0].aggregation_level;
        var courseName = this.courseData.course_name[this.languageKey];
        if (typeof courseName === 'undefined') {
            courseName = this.courseData.course_name['english'];
        }
        if (aggregation_level == 11 || aggregation_level == 12 || aggregation_level == 13 || aggregation_level == 21 || aggregation_level == 22 || aggregation_level == 23) {
            if (this.language == "cy-gb") {
                var subject = this.courseData.statistics.nss[0].subject.welsh_label;
            } else {
                var subject = this.courseData.statistics.nss[0].subject.english_label;
            }
        } else {
            var subject = courseName;
        }
        var percentage = this.courseData.statistics.nss[0].question_16.agree_or_strongly_agree + '%';
        var introText = CONTENT.explanationIntro[this.language];

        var statNode = this.createStatNode(this.createTitleNode(percentage), this.createIntroNode(introText));

        var slideNode = this.createSlideNode('explanation', statNode, aggregation_level, subject, courseName);
        slideNode.ariaLabel = `${percentage} ${introText}`
        return slideNode;
    },

    renderWorkSlide: function () {
        var aggregation_level = this.courseData.statistics.employment[0].aggregation_level;
        var courseName = this.courseData.course_name[this.languageKey];
        if (typeof courseName === 'undefined') {
            courseName = this.courseData.course_name['english'];
        }
        if (aggregation_level == 11 || aggregation_level == 12 || aggregation_level == 13 || aggregation_level == 21 || aggregation_level == 22 || aggregation_level == 23) {
            if (this.language == "cy-gb") {
                var subject = this.courseData.statistics.employment[0].subject.welsh_label;
            } else {
                var subject = this.courseData.statistics.employment[0].subject.english_label;
            }
        } else {
            var subject = courseName;
        }
        var percentage = this.courseData.statistics.employment[0].in_work_or_study + '%';
        var introText = CONTENT.workIntro[this.language];

        var statNode = this.createStatNode(this.createTitleNode(percentage), this.createIntroNode(introText));

        var slideNode = this.createSlideNode('work', statNode, aggregation_level, subject, courseName);
        slideNode.ariaLabel = `${percentage} ${introText}`
        return slideNode;
    },

    renderCourseDetails: function (aggregation_level, subject, courseName) {
        var courseDetailsNode = document.createElement('div');
        courseDetailsNode.classList.add('ofsKisClear');
        courseDetailsNode.classList.add('kis-widget__course-details');

        var courseNode = document.createElement("p");
        courseNode.classList.add('ofsKisClear');
        courseNode.classList.add('kis-widget__course');


        if (this.kismode == "Parttime" || this.kismode == "PartTime") {
            this.kismode = CONTENT.PartTime[this.language];
        } else {
            this.kismode = CONTENT.FullTime[this.language];
        }

        if (aggregation_level == 14) {
            courseName += this.courseData.honours_award_provision === 1 ? ' (Hons) ' : ' ';
            var dataFor = CONTENT.dataFor[this.language];
            var at = CONTENT.at[this.language];
            var institution = this.courseData.institution_name[this.languageKey];
            var course = document.createTextNode(dataFor + courseName + ' (' + this.kismode + ')' + at + institution);

        } else if (aggregation_level == 24) {
            courseName += this.courseData.honours_award_provision === 1 ? ' (Hons) ' : ' ';
            var dataFor = CONTENT.dataFor[this.language];
            var at = CONTENT.at[this.language];
            var overTwoYears = CONTENT.overTwoYears[this.language];
            var institution = this.courseData.institution_name[this.languageKey];
            var course = document.createTextNode(dataFor + courseName + ' (' + this.kismode + ')' + at + institution + ', ' + overTwoYears);

        } else if (aggregation_level == 21 || aggregation_level == 22 || aggregation_level == 23) {
            var dataForAggregated = CONTENT.dataForAggregated[this.language];
            var at = CONTENT.at[this.language];
            var institution = this.courseData.institution_name[this.languageKey];
            var overTwoYears = CONTENT.overTwoYears[this.language];
            var course = document.createTextNode(dataForAggregated + subject + ' ' + overTwoYears + at + institution);

        } else if (aggregation_level == 11 || aggregation_level == 12 || aggregation_level == 13) {
            var dataFor = CONTENT.dataForAggregated[this.language];
            var at = CONTENT.at[this.language];
            var institution = this.courseData.institution_name[this.languageKey];
            var course = document.createTextNode(dataFor + subject + at + institution);

        } else {
            var dataFor = CONTENT.dataForAggregated[this.language];
            var at = CONTENT.at[this.language];
            var institution = this.courseData.institution_name[this.languageKey];
            var course = document.createTextNode(dataFor + courseName + at + institution);
        }
        courseNode.appendChild(course);

        courseDetailsNode.appendChild(courseNode);
        courseDetailsNode.ariaLabel = `${courseNode.innerHTML}`

        if (aggregation_level == 14 || aggregation_level == 24) {
            if (this.courseData.sandwich_year) {
                var featuresNode = document.createElement("p");
                featuresNode.classList.add('ofsKisClear');
                featuresNode.classList.add('kis-widget__course');
                var featureList = [this.kismode];
                var placementYear = this.courseData.sandwich_year.code;
                featureList.push(placementYear === 1 ? CONTENT.placementOptional[this.language] :
                    placementYear === 2 ? CONTENT.placement[this.language] : null)
                var yearAbroad = this.courseData.sandwich_year.code;
                featureList.push(yearAbroad === 1 ? CONTENT.abroadOptional[this.language] :
                    yearAbroad === 2 ? CONTENT.abroad[this.language] : null)
                var foundationYear = this.courseData.sandwich_year.code;
                featureList.push(foundationYear === 1 ? CONTENT.foundationOptional[this.language] :
                    foundationYear === 2 ? CONTENT.foundation[this.language] : null)
                var features = document.createTextNode(featureList.filter(Boolean).join(', '));
                featuresNode.appendChild(features);

                courseDetailsNode.appendChild(featuresNode);
            }
        }

        return courseDetailsNode;
    },

    renderCTABlock: function () {
        var ctaBlockNode = document.createElement('div');
        // ctaBlockNode.classList.add('ofsKisClear');
        ctaBlockNode.classList.add('kis-widget__cta-block');
        var headingNode = document.createElement('p');
        headingNode.classList.add('ofsKisClear');
        headingNode.classList.add('kis-widget__heading');
        var leadNode1 = document.createElement("span");
        // leadNode1.classList.add('cta-lead');
        var lead1 = document.createTextNode(CONTENT.ctaLead1[this.language]);
        var leadNode2 = document.createElement("strong");
        // leadNode2.classList.add('cta-lead');
        var lead2 = document.createTextNode(CONTENT.ctaLead2[this.language]);
        var leadNode3 = document.createElement("span");
        // leadNode3.classList.add('cta-lead');
        var lead3 = document.createTextNode(CONTENT.ctaLead3[this.language]);
        leadNode1.appendChild(lead1);
        leadNode2.appendChild(lead2);
        leadNode3.appendChild(lead3);
        headingNode.appendChild(leadNode1);
        headingNode.appendChild(leadNode2);
        headingNode.appendChild(leadNode3);

        ctaBlockNode.appendChild(headingNode);

        var logoNode = document.createElement('img');
        logoNode.classList.add('ofsKisClear');
        logoNode.classList.add('kis-widget__logo');
        logoNode.setAttribute('src', CONTENT.logo[this.language]);
        logoNode.setAttribute('alt', CONTENT.logoAlt[this.language]);
        ctaBlockNode.appendChild(logoNode);

        var ctaWrapperNode = document.createElement('a');
        var span = document.createElement('span')
        var newWindowText = document.createTextNode(CONTENT.open_in_new_window[this.language])
        span.appendChild(newWindowText)

        ctaWrapperNode.href = this.generateLink;
        ctaWrapperNode.setAttribute('target', '_blank');
        ctaWrapperNode.classList.add('ofsKisClear');
        ctaWrapperNode.classList.add('kis-widget__cta');
        ctaWrapperNode.classList.add('kis_button')
        var ctaNode = document.createElement('p');
        var cta = document.createTextNode(CONTENT.cta[this.language]);
        ctaWrapperNode.appendChild(ctaNode);
        ctaNode.appendChild(cta);
        ctaBlockNode.appendChild(ctaWrapperNode);
        ctaBlockNode.ariaLabel = `${leadNode1.innerHTML} ${leadNode2.innerHTML} ${leadNode3.innerHTML}`;
        ctaWrapperNode.appendChild(span)

        this.targetDiv.appendChild(ctaBlockNode);

    },

    carousel: function () {

        let slides = this.targetDiv.getElementsByClassName("kis-widget__lead-slide");

        for (let slide of slides) {
            slide.style.display = "none";
        }

        this.slideIndex++;
        if (this.slideIndex >= slides.length) {
            this.slideIndex = 0
        }

        slides[this.slideIndex].style.display = "block"
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.carousel.bind(this), 5000); // Change image every 5 seconds
        let allSlides = document.querySelectorAll(`[id^="kis-widget_"]`);

        for (let slide of allSlides) {
            slide.addEventListener("mouseenter", () => {
                clearTimeout(this.timeout);
            })
            slide.addEventListener("mouseleave", () => {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(this.carousel.bind(this), 5000);
            })
        }
    }
}

var NoDataWidget = function (targetDiv, courseName, institutionName, language, languageKey, kismode, generateLink) {
    this.targetDiv = targetDiv;
    this.courseName = courseName;
    this.institutionName = institutionName;
    this.language = language;
    this.languageKey = languageKey;
    this.kismode = kismode;
    this.generateLink = generateLink;
    this.setup();
}

NoDataWidget.prototype = {
    setup: function () {
        this.renderNoDataLead();
        this.renderNoDataCTABlock();
    },

    renderNoDataLead: function (parentNode) {
        var leadNode = document.createElement('div');
        leadNode.classList.add('ofsKisClear');
        leadNode.classList.add('kis-widget__lead');

        if (typeof this.courseName[this.languageKey] !== 'undefined' && typeof this.institutionName[this.languageKey] !== 'undefined') {
            var courseNode = document.createElement("p");
            courseNode.classList.add('ofsKisClear');
            courseNode.classList.add('kis-widget__intro');

            var courseName = this.courseName[this.languageKey];
            var at = CONTENT.at[this.language];
            var institution = this.institutionName[this.languageKey];
            var course = document.createTextNode(courseName + at + institution);

            courseNode.appendChild(course);
            leadNode.appendChild(courseNode);
        } else {
            var courseNode = document.createElement("p");
            courseNode.classList.add('ofsKisClear');
            courseNode.classList.add('kis-widget__intro');
            courseName = this.courseName['english'];
            var at = CONTENT.at['en-gb']
            var institution = this.institutionName['english'];
            var course = document.createTextNode(courseName + at + institution);

            courseNode.appendChild(course);
            leadNode.appendChild(courseNode);
        }

        var courseDetailsNode = document.createElement('div');
        courseDetailsNode.classList.add('ofsKisClear');
        courseDetailsNode.classList.add('kis-widget__course-details');

        var introNode = document.createElement("p");
        introNode.classList.add('ofsKisClear');
        introNode.classList.add('kis-widget__course');
        var intro = document.createTextNode(CONTENT.noDataIntro[this.language]);
        introNode.appendChild(intro);
        courseDetailsNode.appendChild(introNode);
        leadNode.appendChild(courseDetailsNode);
        this.targetDiv.appendChild(leadNode);
    },

    renderNoDataCTABlock: function () {
        var ctaBlockNode = document.createElement('div');
        ctaBlockNode.classList.add('ofsKisClear');
        ctaBlockNode.classList.add('kis-widget__cta-block');
        var headingNode = document.createElement('p');
        headingNode.classList.add('ofsKisClear');
        headingNode.classList.add('kis-widget__heading');
        var leadNode1 = document.createElement("span");
        leadNode1.classList.add('ofsKisClear');
        leadNode1.classList.add('kis-widget__cta-lead');
        var lead1 = document.createTextNode(CONTENT.noDataCtaLead1[this.language]);
        var leadNode2 = document.createElement("strong");
        leadNode2.classList.add('ofsKisClear');
        leadNode2.classList.add('kis-widget__cta-lead');
        var lead2 = document.createTextNode(CONTENT.noDataCtaLead2[this.language]);
        var leadNode3 = document.createElement("span");
        leadNode3.classList.add('ofsKisClear');
        leadNode3.classList.add('kis-widget__cta-lead');
        var lead3 = document.createTextNode(CONTENT.noDataCtaLead3[this.language]);

        leadNode1.appendChild(lead1);
        leadNode2.appendChild(lead2);
        leadNode3.appendChild(lead3);
        headingNode.appendChild(leadNode1);
        headingNode.appendChild(leadNode2);
        headingNode.appendChild(leadNode3);

        ctaBlockNode.appendChild(headingNode);

        var logoNode = document.createElement('img');
        logoNode.classList.add('ofsKisClear');
        logoNode.classList.add('kis-widget__logo');
        logoNode.setAttribute('src', CONTENT.logo[this.language]);
        logoNode.setAttribute('alt', CONTENT.logoAlt[this.language]);
        ctaBlockNode.appendChild(logoNode);


        var ctaWrapperNode = document.createElement('a');
        ctaWrapperNode.href = this.generateLink;
        ctaWrapperNode.setAttribute('target', '_blank');
        ctaWrapperNode.classList.add('ofsKisClear');
        ctaWrapperNode.classList.add('kis-widget__cta');
        ctaWrapperNode.classList.add('kis_button')
        var span = document.createElement('span')
        var newWindowText = document.createTextNode(CONTENT.open_in_new_window[this.language])
        span.appendChild(newWindowText)

        var ctaNode = document.createElement('p');
        var cta = document.createTextNode(CONTENT.noDataCta[this.language]);
        ctaNode.appendChild(cta);
        ctaWrapperNode.appendChild(ctaNode);
        ctaWrapperNode.appendChild(span)
        ctaBlockNode.appendChild(ctaWrapperNode);

        this.targetDiv.appendChild(ctaBlockNode);
    }
}

function init() {
    var widgetTarget = document.getElementsByClassName('kis-widget');
    for (var i = 0; i < widgetTarget.length; i++) {
        widgetTarget[i].id = "kis-widget_" + (i + 1);
        new DiscoverUniWidget(widgetTarget[i]);
    }
}

init();

