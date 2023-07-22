import * as TaskManager from 'expo-task-manager'
import { startLocationUpdatesAsync, Accuracy } from 'expo-location'

export const BACKGROUND_TASK_NAME = 'location-tracking'

TaskManager.defineTask(BACKGROUND_TASK_NAME, ({ data, error }: any) => {
  try {
    if (error) {
      throw error
    }

    const { coords, timestamp } = data.location[0]

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    }

    console.log(currentLocation)
  } catch (error) {
    console.log(error)
  }
})

export async function startLocationTask() {
  try {
    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    })
  } catch (error) {
    console.log(error)
  }
}
