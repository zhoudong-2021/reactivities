import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadingInitial, loadActivities, activitiesOrderByDate,
        needReloading, setNeedReloading} = activityStore;
  
    useEffect(() => {
      if(activitiesOrderByDate.length < 2 || needReloading) {
          loadActivities();
          setNeedReloading(false);
        };
    }, [loadActivities, activitiesOrderByDate, setNeedReloading, needReloading]);
  
    if(loadingInitial) return <LoadingComponent inverted={true} content={'Loading activities...'} />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})