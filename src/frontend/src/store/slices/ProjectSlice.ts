import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { ProjectStateTypes } from '@/store/types/IProject';

const initialState: ProjectStateTypes = {
  projectLoading: true,
  projectTaskBoundries: [],
  newProjectTrigger: false,
  projectInfo: {},
  projectSubmissionLoading: false,
  projectSubmission: [],
  projectDataExtractLoading: false,
  downloadProjectFormLoading: { type: 'form', loading: false },
  generateProjectTilesLoading: false,
  tilesList: [],
  tilesListLoading: false,
  downloadTilesLoading: false,
  customBasemapUrl: null,
  downloadDataExtractLoading: false,
  taskModalStatus: false,
  toggleGenerateMbTilesModal: false,
  mobileFooterSelection: 'explore',
  projectDetailsLoading: true,
  projectDashboardDetail: null,
  entityOsmMap: [],
  entityOsmMapLoading: false,
  updateEntityStateLoading: false,
  projectDashboardLoading: false,
  geolocationStatus: false,
  projectCommentsList: [],
  projectPostCommentsLoading: false,
  projectGetCommentsLoading: false,
  clearEditorContent: false,
  projectTaskActivity: [],
  projectActivityLoading: false,
  downloadSubmissionLoading: false,
};

const ProjectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    SetProjectTaskBoundries(state, action) {
      state.projectTaskBoundries = action.payload;
    },
    SetProjectLoading(state, action) {
      state.projectLoading = action.payload;
    },
    SetProjectInfo(state, action) {
      state.projectInfo = action.payload;
    },
    SetNewProjectTrigger(state) {
      state.newProjectTrigger = !state.newProjectTrigger;
    },
    clearProjects(state, action) {
      storage.removeItem('persist:project');
      state.projectTaskBoundries = action.payload;
    },
    GetProjectSubmissionLoading(state, action) {
      state.projectSubmissionLoading = action.payload;
    },
    SetProjectSubmission(state, action) {
      state.projectSubmission = action.payload;
    },
    SetDownloadProjectFormLoading(state, action) {
      state.downloadProjectFormLoading = action.payload;
    },
    SetGenerateProjectTilesLoading(state, action) {
      state.generateProjectTilesLoading = action.payload;
    },
    SetTilesList(state, action) {
      state.tilesList = action.payload;
    },
    SetTilesListLoading(state, action) {
      state.tilesListLoading = action.payload;
    },
    SetDownloadTileLoading(state, action) {
      state.downloadTilesLoading = action.payload;
    },
    SetPmtileBasemapUrl(state, action) {
      state.customBasemapUrl = action.payload;
    },
    SetDownloadDataExtractLoading(state, action) {
      state.downloadDataExtractLoading = action.payload;
    },
    ToggleTaskModalStatus(state, action) {
      state.taskModalStatus = action.payload;
    },
    ToggleGenerateMbTilesModalStatus(state, action) {
      state.toggleGenerateMbTilesModal = action.payload;
    },
    SetMobileFooterSelection(state, action) {
      state.mobileFooterSelection = action.payload;
    },
    SetProjectDetialsLoading(state, action) {
      state.projectDetailsLoading = action.payload;
    },
    SetProjectDashboardDetail(state, action) {
      state.projectDashboardDetail = action.payload;
    },
    SetEntityToOsmIdMapping(state, action) {
      state.entityOsmMap = action.payload;
    },
    SetEntityToOsmIdMappingLoading(state, action) {
      state.entityOsmMapLoading = action.payload;
    },
    SetProjectDashboardLoading(state, action) {
      state.projectDashboardLoading = action.payload;
    },
    ToggleGeolocationStatus(state, action) {
      state.geolocationStatus = action.payload;
    },
    SetProjectCommentsList(state, action) {
      state.projectCommentsList = action.payload;
    },
    SetPostProjectCommentsLoading(state, action) {
      state.projectPostCommentsLoading = action.payload;
    },
    SetProjectGetCommentsLoading(state, action) {
      state.projectGetCommentsLoading = action.payload;
    },
    ClearEditorContent(state, action) {
      state.clearEditorContent = action.payload;
    },
    UpdateProjectCommentsList(state, action) {
      state.projectCommentsList = [...state.projectCommentsList, action.payload];
    },
    SetProjectTaskActivity(state, action) {
      state.projectTaskActivity = action.payload;
    },
    SetProjectTaskActivityLoading(state, action) {
      state.projectActivityLoading = action.payload;
    },
    UpdateProjectTaskActivity(state, action) {
      state.projectTaskActivity = [action.payload, ...state.projectTaskActivity];
    },
    UpdateEntityStateLoading(state, action) {
      state.updateEntityStateLoading = action.payload;
    },
    UpdateEntityState(state, action) {
      const updatedEntityOsmMap = state.entityOsmMap?.map((entity) => {
        if (entity.id === action.payload.id) {
          return action.payload;
        }
        return entity;
      });
      state.entityOsmMap = updatedEntityOsmMap;
    },
    UpdateProjectTaskBoundries(state, action) {
      const updatedProjectTaskBoundries = state.projectTaskBoundries?.map((boundary) => {
        if (boundary.id == action.payload.projectId) {
          const updatedBoundary = boundary?.taskBoundries?.map((taskBoundary) => {
            if (taskBoundary?.id === +action.payload.taskId) {
              return {
                ...taskBoundary,
                task_state: action.payload.task_state,
                actioned_by_uid: action.payload.actioned_by_uid,
                actioned_by_username: action.payload.actioned_by_username,
              };
            }
            return taskBoundary;
          });
          return { id: boundary.id, taskBoundries: updatedBoundary };
        }
        return boundary;
      });
      state.projectTaskBoundries = updatedProjectTaskBoundries;
    },
    SetDownloadSubmissionGeojsonLoading(state, action) {
      state.downloadSubmissionLoading = action.payload;
    },
  },
});

export const ProjectActions = ProjectSlice.actions;
export default ProjectSlice;
