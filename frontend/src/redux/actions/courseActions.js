import {
  LIST_COURSES_FAIL,
  LIST_COURSES_POBULAR_FAIL,
  LIST_COURSES_POBULAR_REQUEST,
  LIST_COURSES_POBULAR_RESET,
  LIST_COURSES_POBULAR_SUCCESS,
  LIST_COURSES_REQUEST,
  LIST_COURSES_RESET,
  LIST_COURSES_SUCCESS,
  LIST_COURSE_DETAILS_FAIL,
  LIST_COURSE_DETAILS_REQUEST,
  LIST_COURSE_DETAILS_RESET,
  LIST_COURSE_DETAILS_SUCCESS,
  LIST_NEW_COURSES_FAIL,
  LIST_NEW_COURSES_REQUEST,
  LIST_NEW_COURSES_RESET,
  LIST_NEW_COURSES_SUCCESS,
  MY_COURSES_FAIL,
  MY_COURSES_REQUEST,
  MY_COURSES_RESET,
  MY_COURSES_SUCCESS,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  CHECK_STUDENT_REQUEST,
  CHECK_STUDENT_SUCCESS,
  CHECK_STUDENT_FAIL,
  LIST_COURSES_PURCHASED_REQUEST,
  LIST_COURSES_PURCHASED_SUCCESS,
  LIST_COURSES_PURCHASED_FAIL,
} from "../constants/courseconstants";
import axios from "axios";

export const listMyCourses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_COURSES_REQUEST,
    });
    console.log("before token");

    const { token } = getState();
    console.log("after token");

    console.log(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/courses/Mycourses`, config);
    console.log(data);
    dispatch({
      type: MY_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MY_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listCoursespurshased = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_COURSES_PURCHASED_REQUEST,
    });

    const { token } = getState();

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(
      `/courses/Coursespurshased?page=${page}`,
      config
    );
    dispatch({
      type: LIST_COURSES_PURCHASED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_COURSES_PURCHASED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const CheckStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECK_STUDENT_REQUEST,
    });
    const { token } = getState();

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(
      `/courses/checkmembership?id=${id}`,
      config
    );
    dispatch({
      type: CHECK_STUDENT_SUCCESS,
      payload: data.isStudent,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHECK_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ListcoursesbyTopic =
  (Topic, Allcourses = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_COURSES_REQUEST });
      const { data } = await axios.get(
        `/courses/topic/?Topic=${Topic}&All=${Allcourses}`
      );
      dispatch({ type: LIST_COURSES_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: LIST_COURSES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const ListnewCourses =
  (Topic, All = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_NEW_COURSES_REQUEST });
      const { data } = await axios.get(
        `/courses/topic/?Topic=${Topic}&All=${All}&New=true`
      );
      dispatch({ type: LIST_NEW_COURSES_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: LIST_NEW_COURSES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const Listcoursesbypobularity =
  (Topic = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_COURSES_POBULAR_REQUEST });
      const { data } = await axios.get(`/courses/pobular?Topic=${Topic}`);
      dispatch({ type: LIST_COURSES_POBULAR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_COURSES_POBULAR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const Getcoursedetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(`/courses/${id}`);
    console.log(data);

    dispatch({ type: LIST_COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateCourse = (course) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    const { data } = await axios.put(
      `/courses/updatecourse/${course._id}`,
      course
    );

    dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const DeleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });

    const { data } = await axios.delete(`/courses/deletecourse/${id}`);

    dispatch({ type: COURSE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const CreateCourse = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_CREATE_REQUEST,
    });
    console.log("before token");

    const { token } = getState();
    console.log("after token");

    console.log(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.post(`/courses/addcourse`, {}, config);
    dispatch({
      type: COURSE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
