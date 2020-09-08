import axios from 'axios'

const BASE_URL = 'https://offerassistant.azurewebsites.net/api'

export const uploadSessionsToDB = importedData => axios.post(`${BASE_URL}/upload`, importedData)
export const validateSessionId = sessionId => axios.get(`${BASE_URL}/validate/${sessionId}`)
export const updateCancelStatus = (cancelStatus, session, user) => axios.put(`${BASE_URL}/update`, {cancelStatus, session, user})
export const getSessionsToExportFromDB = (values, user) => axios.post(`${BASE_URL}/export`, {values, user})
export const addCommentToDB = (comment, user, session) => axios.post(`${BASE_URL}/comment`, {comment, user, session})
export const getOfferCodesFromDB = () => axios.get(`${BASE_URL}/offers`)
export const markSessionsAsComplete = (sessions, user) => axios.put(`${BASE_URL}/completed`, {sessions, user})
