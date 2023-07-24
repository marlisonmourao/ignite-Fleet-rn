import * as TaskManager from 'expo-task-manager'
import {
  startLocationUpdatesAsync,
  Accuracy,
  hasStartedLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import { saveStorageLocation } from '@libs/asyncStorage/locationStorage'

export const BACKGROUND_TASK_NAME = 'location-tracking'

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) {
      throw error
    }

    if (data) {
      const { coords, timestamp } = data.locations[0]

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
      }
      await saveStorageLocation(currentLocation)
    }
  } catch (error) {
    console.log(error)
    stopLocationTask()
  }
})

export async function startLocationTask() {
  try {
    const hashStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME,
    )

    if (hashStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function stopLocationTask() {
  try {
    const hashStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME,
    )

    if (hashStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
    }
  } catch (error) {
    console.log(error)
  }
}
