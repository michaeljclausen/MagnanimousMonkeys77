import React from 'react';
import LectureMaker from './LectureMaker.jsx';
import LectureButtons from './LectureButtons.jsx';
import ThumbsChecker from './ThumbsChecker.jsx';

class Instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
        <h1>Instructor Component</h1>
        {this.props.lectureStatus === 'lectureNotStarted'
         ? <LectureMaker startLecture={this.props.startLecture}/>
         : this.props.lectureStatus === 'lectureStarted'
         ? <LectureButtons startThumbsCheck={this.props.startThumbsCheck} endLecture={this.props.endLecture} />
         : <ThumbsChecker clearThumbsCheck={this.props.clearThumbsCheck}/>
        }
      </div>
    )
  }
}

export default Instructor;
