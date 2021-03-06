import React from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

const ProecteDetails = props => {
  console.log(props)
  const { project, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <img src={project.photoURL} alt='' width="50%" height='50%'/>
            <p>{project.content}</p>
          </div>
          <div className="card-action gret ligthen-4 grey-text">
            <div>
              Posted by<span> { project.authorFirstName } </span>
             <span> { project.authorLastName }</span> {" "}
            </div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="contener center">
        <p>loading project ...</p>
      </div>
    );
  }
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log('ownProps',ownProps)
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(ProecteDetails);
