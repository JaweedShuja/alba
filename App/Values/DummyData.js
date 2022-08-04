import {string} from 'App/i18n';
import Strings from './Strings';

export const useDummyData = () => {
  const Data = {
    HOME_SCREEN_OBJECT: {
      headerList: [
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bigstockphoto.com%2F&psig=AOvVaw0bRf7Z7Pf0ni5P8oLA1Era&ust=1618464515695000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjzwLGA_e8CFQAAAAAdAAAAABAJ',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Ffile-converter&psig=AOvVaw0bRf7Z7Pf0ni5P8oLA1Era&ust=1618464515695000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjzwLGA_e8CFQAAAAAdAAAAABAP',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bigstockphoto.com%2F&psig=AOvVaw0bRf7Z7Pf0ni5P8oLA1Era&ust=1618464515695000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjzwLGA_e8CFQAAAAAdAAAAABAJ',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Ffile-converter&psig=AOvVaw0bRf7Z7Pf0ni5P8oLA1Era&ust=1618464515695000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjzwLGA_e8CFQAAAAAdAAAAABAP',
      ],
      bodyList: [
        {
          title: `${string.PRIMARY} ${'\n'} ${string.SCHOOL}`,
          header: string.PRIMARY_SCHOOL,
          image: 'http://alotiti.ir/alba/primaryschool.png',
          color: 'rgba(122,228,254,1)',
        },
        {
          title: `${string.HIGH}${'\n'} ${string.SCHOOL}`,
          header: string.HIGH_SCHOOL,
          image: 'http://alotiti.ir/alba/highschool.png',
          color: '#F0C1F8',
        },
        {
          title: `${string.LANGUAGE} ${'\n'} ${string.LANGUAGE} ${
            string.COURSES
          }`,
          header: string.LANGUAGE_COURSES,
          image: 'http://alotiti.ir/alba/languagecourses.png',
          color: '#FF82AE',
        },
        {
          title: `${string.OTHER} ${'\n'} ${string.COURSES}`,
          header: string.OTHER_COURSES,
          image: 'http://alotiti.ir/alba/othercourses.png',
          color: '#769ED9',
        },
      ],
    },
    SPECIAL_SCREEN_STUDENTS_OBJECT: [
      {
        title: string.LESSONS_NOTES,
        image: require('App/Assets/icons/post-it.png'),
        screen: 'STUDENT_LESSONS_NOTE_SCREEN',
      },
      {
        title: string.MY_SCHEDULE,
        image: require('App/Assets/icons/schedule.png'),
        screen: 'STUDENT_MY_SCHEDULE_SCREEN',
      },
      {
        title: string.EXAMS_STRING,
        image: require('App/Assets/icons/test.png'),
        screen: 'STUDENT_EXAMS_SCREEN',
      },
      {
        title: string.GRADES,
        image: require('App/Assets/icons/test-grade.png'),
        screen: 'STUDENT_GRADES_SCREEN',
      },
      {
        title: string.NOTIFICATION,
        image: require('App/Assets/icons/notification-bell.png'),
        screen: 'NOTIFICATION_SCREEN',
      },
    ],
    MESSAGES_SCREEN_STUDENTS_OBJECT: [
      {
        name: 'Carl Maks',
        job: 'Physics Of March',
        unreadcount: 2,
        onlinetime: '3m',
        message: 'Yes Ofcourse',
        image: 'http://alotiti.ir/alba/person1.png',
      },
      {
        name: 'David Wilson',
        job: 'Math Of August',
        unreadcount: '+99',
        onlinetime: '1h',
        message: 'Thanks For Youre Help',
        image: 'http://alotiti.ir/alba/person2.png',
      },
      {
        name: 'John Tokyo',
        job: 'Math Of February',
        unreadcount: 0,
        onlinetime: '5h',
        message: 'we Will Notice You',
        image: 'http://alotiti.ir/alba/person3.png',
      },
      {
        name: 'Matilda Carry',
        job: 'Math Of September',
        unreadcount: 0,
        onlinetime: '10h',
        message: 'This Question Is About Second Episode Of',
        image: 'http://alotiti.ir/alba/person4.png',
      },
      {
        name: 'Lizzy Smith',
        job: 'Literature Of March',
        unreadcount: 0,
        onlinetime: '1d',
        message: 'Yes Kepp Practising',
        image: 'http://alotiti.ir/alba/person5.png',
      },
      {
        name: 'Jason Brown',
        job: 'Physics Of March',
        unreadcount: 0,
        onlinetime: '1d',
        message: 'How Are You?',
        image: 'http://alotiti.ir/alba/person6.png',
      },
    ],
    PROFILE_SCREEN_OBJECTS: {
      english: {
        welcome: string.WELCOME,
        desc: string.SIGN_IN_OR_SIGN_UP_TO_SEE_COURSE_AND_SEE_DETAILS,
        logo: 'Logo',
        studentLogin: string.STUDENT_LOGIN_SIGNUP,
        teacherLogin: string.TEACHER_LOGIN_SIGNUP,
        settings: [
          {
            title: string.LANGUAGE,
            icon: 'right',
            image: require('App/Assets/icons/iraq.png'),
          },
          {
            title: string.PRIVACY_POLICY,
            icon: 'right',
            image: require('App/Assets/icons/login.png'),
          },
          {
            title: string.TERMS_AND_CONDITIONS,
            icon: 'right',
            image: require('App/Assets/icons/mail.png'),
          },
        ],
      },
    },
    COURSES_SCREEN_OBJECTS: {
      filter: [
        {
          name: string.PRIMARY_SCHOOL,
          icon: Strings.Icons.RIGHT_SMALL,
          image: require('App/Assets/icons/graduation-hat.png'),
        },
        {
          name: string.ALL_GRADES,
          icon: Strings.Icons.RIGHT_SMALL,
          image: require('App/Assets/icons/equalizer.png'),
        },
      ],
      list: {
        phycisc: {
          name: 'Phycisc',
          array: [
            {
              title: string.PHYCISCS_OF_MARCH,
              color: '#7BD9F3',
              image: {path: 'http://alotiti.ir/alba/course1.png'},
              price: '29.99l',
              participants: '19',
            },
            {
              title: string.PHYCISCS_OF_AUGUST,
              color: '#2F3C80',
              image: {path: 'http://alotiti.ir/alba/course2.png'},
              price: '59.99l',
              participants: '45',
            },
            {
              title: string.PHYCISCS_OF_MARCH,
              color: '#7BD9F3',
              image: {path: 'http://alotiti.ir/alba/course1.png'},
              price: '29.99l',
              participants: '25',
            },
            {
              title: string.PHYCISCS_OF_AUGUST,
              color: '#2F3C80',
              image: {path: 'http://alotiti.ir/alba/course2.png'},
              price: '59.99l',
              participants: '23',
            },
          ],
        },
        silence: {
          name: 'Silence',
          array: [
            {
              title: string.PHYCISCS_OF_MARCH,
              color: '#7BD9F3',
              image: 'http://alotiti.ir/alba/course1.png',
            },
            {
              title: string.PHYCISCS_OF_AUGUST,
              color: '#2F3C80',
              image: 'http://alotiti.ir/alba/course2.png',
            },
            {
              title: string.PHYCISCS_OF_MARCH,
              color: '#7BD9F3',
              image: 'http://alotiti.ir/alba/course1.png',
            },
            {
              title: string.PHYCISCS_OF_AUGUST,
              color: '#2F3C80',
              image: 'http://alotiti.ir/alba/course2.png',
            },
          ],
        },
        math: {
          name: 'Math',
          array: [
            {
              title: string.PHYCISCS_OF_MARCH,
              color: '#7BD9F3',
              image: 'http://alotiti.ir/alba/course1.png',
            },
            {
              title: string.PHYCISCS_OF_AUGUST,
              color: '#2F3C80',
              image: 'http://alotiti.ir/alba/course2.png',
            },
            {
              title: string.PHYCISCS_OF_MARCH,
              color: '#7BD9F3',
              image: 'http://alotiti.ir/alba/course1.png',
            },
            {
              title: string.PHYCISCS_OF_AUGUST,
              color: '#2F3C80',
              image: 'http://alotiti.ir/alba/course2.png',
            },
          ],
        },
      },
      videos: [
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '1',
          color: '#20C17B',
          icon: Strings.Icons.PLAY,
          time: 'Available',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '2',
          color: '#20C17B',
          icon: Strings.Icons.PLAY,
          time: 'Available',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '3',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '4',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '5',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '6',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '7',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '8',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
        {
          name: string.PHYCISCS_OF_MARCH,
          episode: '9',
          color: '#FE0072',
          icon: Strings.Icons.PLAY,
          time: '3 March 20:12',
        },
      ],
    },
    //=================== NOT USED ========================
    EDUCATION_GRADE_SCREEN_OBJECTS: [
      {
        title: `First${'\n'}Grade`,
        name: 'All Course For First',
        grade: 'Grade Of Primary School',
        color: '#12A5D9',
      },
      {
        title: `Second${'\n'}Grade`,
        name: 'All Course For Second',
        grade: 'Grade Of Primary School',
        color: '#DD526F',
      },
      {
        title: `Third${'\n'}Grade`,
        name: 'All Course For Third',
        grade: 'Grade Of Primary School',
        color: '#20C17B',
      },
      {
        title: `Fourth${'\n'}Grade`,
        name: 'All Course For Fourth',
        grade: 'Grade Of Primary School',
        color: '#FF706A',
      },
      {
        title: `Fifth${'\n'}Grade`,
        name: 'All Course For Fifth',
        grade: 'Grade Of Primary School',
        color: '#E272FA',
      },
      {
        title: `Sixth${'\n'}Grade`,
        name: 'All Course For Sixth',
        grade: 'Grade Of Primary School',
        color: '#60E0E1',
      },
    ],
    CATEGORY_COURSES_SCREEN_OBJECTS: [
      {
        name: 'Carl Maks',
        month: string.MARCH_COURSES,
        image: 'http://alotiti.ir/alba/teacher4.png',
        desc: 'A good student, Thatcher was accepted to Oxford University,where she studied hemistry at Somerville College.During that A good student, Thatcher was accepted to Oxford University,where she studied',
      },
      {
        name: 'Doris Wilson',
        month: string.AUGUST_COURSES,
        image: 'http://alotiti.ir/alba/teacher1.png',
        desc: 'A good student, Thatcher was accepted to Oxford University,where she studied hemistry at Somerville College.During that A good student, Thatcher was accepted to Oxford University,where she studied',
      },
      {
        name: 'Carl Maks',
        month: string.MARCH_COURSES,
        image: 'http://alotiti.ir/alba/teacher2.png',
        desc: 'A good student, Thatcher was accepted to Oxford University,where she studied hemistry at Somerville College.During that A good student, Thatcher was accepted to Oxford University,where she studied',
      },
      {
        name: 'Doris Wilson',
        month: string.AUGUST_COURSES,
        image: 'http://alotiti.ir/alba/teacher3.png',
        desc: 'A good student, Thatcher was accepted to Oxford University,where she studied hemistry at Somerville College.During that A good student, Thatcher was accepted to Oxford University,where she studied',
      },
    ],
    CONTACT_US_SCREEN_OBJECT: {
      contactInfo: {
        info: string.CONTACT_INFO,
        mail: 'Alba@gmail.com',
        tel: '1234567890',
        message: string.MESSAGE_TO_SUPPORT,
        placeholder: string.WRITE_YOUR_MESSAGE_HERE,
        ways: string.WAYS_YOU_CAN_GET_ACTIVATION_CODE,
        mailImage: require('App/Assets/icons/email.png'),
        telIcon: require('App/Assets/icons/phone-call.png'),
        textBtn: [
          {
            title: string.PLACES_YOU_CAN_GET_CODE,
            color: '#FF706A',
            icon: 'right',
          },
          {
            title: string.PURCHASE_WITH_TURK_TELEKOM,
            color: '#00BFF3',
            icon: 'down',
          },
          {
            title: string.PURCHASE_WITH_TURKCELL,
            color: '#FCD83A',
            icon: 'down',
          },
        ],
      },
    },
    //=================== NOT USED ========================
    SHOP_LIST_OBJECTS: [
      {
        city: 'Intanbul',
        name: 'Storm Stationery',
        address: 'Gumuspala Mh , Manolya Sk, No:2/1A D:1 Avcilar/istanbul',
        color: '#60E0E1',
      },
      {
        city: 'Konya',
        name: 'Storm Stationery',
        address: 'Gumuspala Mh , Manolya Sk, No:2/1A D:1 Avcilar/istanbul',
        color: '#DD526F',
      },
      {
        city: 'Izmir',
        name: 'Storm Stationery',
        address: 'Gumuspala Mh , Manolya Sk, No:2/1A D:1 Avcilar/istanbul',
        color: '#12A5D9',
      },
      {
        city: 'Ankara',
        name: 'Storm Stationery',
        address: 'Gumuspala Mh , Manolya Sk, No:2/1A D:1 Avcilar/istanbul',
        color: '#FF706A',
      },
      {
        city: 'Ankara',
        name: 'Storm Stationery',
        address: 'Gumuspala Mh , Manolya Sk, No:2/1A D:1 Avcilar/istanbul',
        color: '#E272FA',
      },
    ],
    //=================== NOT USED ========================
    STUDENT_GRADES_OBJECTS: [
      {
        title: 'First Grade Of High School',
        lesson: 'Physics',
        teacher: 'Carl Maks',
        grade: 80,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Math',
        teacher: 'Dalice Wilson',
        grade: 95,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'English',
        teacher: 'Herry Star',
        grade: 78,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Arabic',
        teacher: 'Muhmmed Neri',
        grade: 45,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Philosophy',
        teacher: 'Ali Javad',
        grade: 60,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Physics',
        teacher: 'Carl Maks',
        grade: 80,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Math',
        teacher: 'Dalice Wilson',
        grade: 95,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'English',
        teacher: 'Herry Star',
        grade: '78',
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Arabic',
        teacher: 'Muhmmed Neri',
        grade: 45,
        color: '',
      },
      {
        title: 'First Grade Of High School',
        lesson: 'Philosophy',
        teacher: 'Ali Javad',
        grade: 60,
        color: '',
      },
    ],
    //=================== NOT USED ========================
    STUDENT_EXAMS_OBJECTS: [
      {
        name: 'First Grade Of High School',
        grade: 'Physics Exam',
        type: 'Test',
        begin: '14:00',
        end: '15:00',
      },
      {
        name: 'First Grade Of High School',
        grade: 'Math Exam',
        type: 'Classic',
        begin: '14:00',
        end: '15:00',
      },
      {
        name: 'First Grade Of High School',
        grade: 'Physics Exam',
        type: 'Test',
        begin: '14:00',
        end: '15:00',
      },
      {
        name: 'First Grade Of High School',
        grade: 'Math Exam',
        type: 'Classic',
        begin: '14:00',
        end: '15:00',
      },
      {
        name: 'First Grade Of High School',
        grade: 'Physics Exam',
        type: 'Test',
        begin: '14:00',
        end: '15:00',
      },
      {
        name: 'First Grade Of High School',
        grade: 'Math Exam',
        type: 'Classic',
        begin: '14:00',
        end: '15:00',
      },
    ],
    //=================== NOT USED ========================
    STUDENT_LESSONS_NOTE_OBJECTS: [
      {
        title: 'Physics',
        body: [
          {
            title: 'Physics March',
            name: 'speed.pdf',
            type: 'pdf',
            link: '',
          },
          {
            title: 'Physics August',
            name: '',
            type: 'image',
            link: 'http://alotiti.ir/alba/exam.png',
          },
          {
            title: 'Physics March',
            name: 'speed.pdf',
            type: 'pdf',
            link: '',
          },
        ],
      },
      {
        title: 'Math',
        body: [
          {
            title: 'Physics August',
            name: '',
            type: 'image',
            link: 'http://alotiti.ir/alba/exam.png',
          },
          {
            title: 'Math Of March',
            name: 'percentages.pdf',
            type: 'pdf',
            link: '',
          },
        ],
      },
      {
        title: 'Arabic',
        body: [
          {
            title: 'Arabic March',
            name: 'speed.pdf',
            type: 'pdf',
            link: '',
          },
          {
            title: 'Arabic August',
            name: '',
            type: 'image',
            link: 'http://alotiti.ir/alba/exam.png',
          },
          {
            title: 'Arabic March',
            name: 'speed.pdf',
            type: 'pdf',
            link: '',
          },
        ],
      },
    ],
    //=================== NOT USED ========================
    STUDENT_MY_SCHEDULE_OBJECTS: {
      lessons: [
        {
          name: 'Physics',
        },
        {
          name: 'Math',
        },
        {
          name: 'Literature',
        },
        {
          name: 'English',
        },
        {
          name: 'Arabic',
        },
        {
          name: 'Persian',
        },
      ],
    },
    SPECIAL_SCREEN_TEACHER_OBJECTS: [
      {
        title: string.ADD_LESSON_NOTE,
        image: require('App/Assets/icons/post-it.png'),
        screen: 'TEACHER_ADD_LESSONS_NOTE_SCREEN',
      },
      {
        title: string.ADD_REMOVE_EXAMS,
        image: require('App/Assets/icons/test.png'),
        screen: 'TEACHER_ADD_REMOVE_EXAMS_SCREEN',
      },
      {
        title: string.SEE_READ_EXAMS,
        image: require('App/Assets/icons/test-grade.png'),
        screen: 'TEACHER_SEE_READ_MORE_EXAMS_SCREEN',
      },
      {
        title: string.SEE_READ_PASSED_EXAMS,
        image: require('App/Assets/icons/test-grade.png'),
        screen: 'TEACHER_SEE_READ_PASSED_EXAMS_SCREEN',
      },
      {
        title: string.NOTIFICATION,
        image: require('App/Assets/icons/notification-bell.png'),
        screen: 'NOTIFICATION_SCREEN',
      },
    ],
    //=================== NOT USED ========================
    ADD_NOTE_SCREEN_OBJECTS: [
      {
        title: 'First Note',
        name: 'speed.pdf',
        type: 'pdf',
        link: '',
      },
      {
        title: 'Exam Example',
        name: '',
        type: 'image',
        link: 'http://alotiti.ir/alba/exam.png',
      },
      {
        title: 'Second Corses Notes',
        name: 'percentages.pdf',
        type: 'pdf',
        link: '',
      },
      {
        title: 'Exam Example',
        name: '',
        type: 'image',
        link: 'http://alotiti.ir/alba/exam.png',
      },
      {
        title: 'Second Corses Notes',
        name: 'percentages.pdf',
        type: 'pdf',
        link: '',
      },
      {
        title: 'Exam Example',
        name: '',
        type: 'image',
        link: 'http://alotiti.ir/alba/exam.png',
      },
      {
        title: 'Second Corses Notes',
        name: 'percentages.pdf',
        type: 'pdf',
        link: '',
      },
    ],
    ADD_ANSWERS_OBJECTS: [
      {
        option: 'A',
        answer: string.WRITE_FIRST_OPTION,
      },
      {
        option: 'B',
        answer: string.WRITE_SECOND_OPTION,
      },
      {
        option: 'C',
        answer: string.WRITE_THIRD_OPTION,
      },
      {
        option: 'D',
        answer: string.WRITE_FOURTH_OPTION,
      },
      {
        option: 'Score',
        answer: 'Score',
      },
    ],
    //=================== NOT USED ========================
    SEE_ANSWERS_SCREEN_OBJECTS: {
      exams: [
        {
          grade: 'First Grade Of HighSchool',
          name: 'Physics Exam',
          type: 'Test',
          start: '14:00',
          end: '13:00',
        },
        {
          grade: 'First Grade Of HighSchool',
          name: 'Physics Exam',
          type: 'Classic',
          start: '14:00',
          end: '13:00',
        },
      ],
      participate: [
        {
          name: 'Carl Maks',
          image: 'http://alotiti.ir/alba/person.png',
        },
        {
          name: 'Doris Wilson',
          image: 'http://alotiti.ir/alba/teacher3.png',
        },
        {
          name: 'Carl Maks',
          image: 'http://alotiti.ir/alba/person.png',
        },
        {
          name: 'Doris Wilson',
          image: 'http://alotiti.ir/alba/teacher3.png',
        },
      ],
      answers: [
        {
          index: '1',
          question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          trueAnswer: 'Lorem ipsum',
          correct: false,
          option: 'A)',
          trueOption: 'D)',
        },
        {
          index: '2',
          question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          trueAnswer: 'Lorem ipsum',
          correct: true,
          option: 'C)',
          trueOption: 'D)',
        },
        {
          index: '3',
          question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          trueAnswer: 'Lorem ipsum',
          correct: false,
          option: 'B)',
          trueOption: 'A)',
        },
      ],
    },
    EXAM_SCREEN_OBJECTS: [
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'image',
        image: 'http://alotiti.ir/alba/exam.png',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
      {
        type: 'test',
        image: '',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        options: [
          'A) Lorem ipsum',
          'B) Lorem ipsum is Dummy',
          'C) Lorem ipsum is Simply Dummy',
          'D) Lorem ipsum is Simply Dummy Text',
        ],
      },
    ],
    REPLY_VIDEO_MESSAGE_OBJECTS: [
      {
        title: string.PHYSICS_OF_MARCH,
        episode: '1',
        type: 'Free',
        message: 'Hi I Have a Question Could You Help Me',
      },
    ],
  };
  return Data;
};
