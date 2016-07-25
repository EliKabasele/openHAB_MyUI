
/*
 *    AsTeRICS - Assistive Technology Rapid Integration and Construction Set
 * 
 * 
 *        d8888      88888888888       8888888b.  8888888 .d8888b.   .d8888b. 
 *       d88888          888           888   Y88b   888  d88P  Y88b d88P  Y88b
 *      d88P888          888           888    888   888  888    888 Y88b.     
 *     d88P 888 .d8888b  888   .d88b.  888   d88P   888  888         "Y888b.  
 *    d88P  888 88K      888  d8P  Y8b 8888888P"    888  888            "Y88b.
 *   d88P   888 "Y8888b. 888  88888888 888 T88b     888  888    888       "888
 *  d8888888888      X88 888  Y8b.     888  T88b    888  Y88b  d88P Y88b  d88P
 * d88P     888  88888P' 888   "Y8888  888   T88b 8888888 "Y8888P"   "Y8888P" 
 *
 *
 *                    homepage: http://www.asterics.org 
 *
 *     This project has been partly funded by the European Commission, 
 *                      Grant Agreement Number 247730
 *  
 *  
 *         Dual License: MIT or GPL v3.0 with "CLASSPATH" exception
 *         (please refer to the folder LICENSE)
 * 
 */


/* DO NOT EDIT THIS FILE - it is machine generated */
#include <jni.h>
/* Header for class eu_asterics_component_sensor_facetrackerLK_jni_Bridge */

#ifndef _Included_eu_asterics_component_sensor_facetrackerLK_jni_Bridge
#define _Included_eu_asterics_component_sensor_facetrackerLK_jni_Bridge
#ifdef __cplusplus
extern "C" {
#endif
/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    activate
 * Signature: ()I
 */
JNIEXPORT jint JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_activate
  (JNIEnv *, jobject);

/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    deactivate
 * Signature: ()I
 */
JNIEXPORT jint JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_deactivate
  (JNIEnv *, jobject);

/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    getProperty
 * Signature: (Ljava/lang/String;)Ljava/lang/String;
 */
JNIEXPORT jstring JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_getProperty
  (JNIEnv *, jobject, jstring);

/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    setProperty
 * Signature: (Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;
 */
JNIEXPORT jstring JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_setProperty
  (JNIEnv *, jobject, jstring, jstring);

/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    initFace
 */
JNIEXPORT void JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_initFace
  (JNIEnv *, jobject);


/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    showCameraSettings
 */JNIEXPORT void JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_showCameraSettings
  (JNIEnv *, jobject);


/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    setDisplayPosition
 */
JNIEXPORT void JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_setDisplayPosition
	(JNIEnv *env, jobject obj, int x, int y, int w, int h);

/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    saveCameraProfile
 */
JNIEXPORT void JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_saveCameraProfile
  (JNIEnv *, jobject, jstring);

/*
 * Class:     eu_asterics_component_sensor_facetrackerLK_jni_Bridge
 * Method:    loadCameraProfile
 */
JNIEXPORT void JNICALL Java_eu_asterics_component_sensor_facetrackerLK_jni_Bridge_loadCameraProfile
  (JNIEnv *, jobject, jstring);


#ifdef __cplusplus
}
#endif
#endif
