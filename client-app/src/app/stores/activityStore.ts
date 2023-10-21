import { makeAutoObservable } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitialAction(true);

    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split('T')[0];

        this.activities.push(activity);
      });

      this.setLoadingInitialAction(false);
    } catch (error) {
      console.log('error: ', error);
      this.setLoadingInitialAction(false);
    }
  };

  setLoadingInitialAction(state: boolean) {
    this.loadingInitial = state;
  }
}
