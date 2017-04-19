/*
Copyright 2015 Hochschule der Medien (HDM) / Stuttgart Media University

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 

*/


package org.openurc.timeservice.ta;
import java.util.LinkedList;
import java.util.List;

import org.openurc.taframework.SuperTA;
import org.openurc.taframework.SuperTAFacade;

import edu.wisc.trace.uch.util.Session;
/**
 * 
 * @author Lukas Smirek
 *
 */
public class TimeServiceTA extends  SuperTA<TimeHandler> {

	public TimeServiceTA(SuperTAFacade facade) {
		super(facade);
		updateIntervall = 1000;
		TimeHandler h = null;
		h.getDate();
		
		}

	@Override
	public void executeCommand(String commandName, Session session, String value) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void initSessionValues(Session session) {
		session.setValue("/time", TimeHandler.getTime() );
		session.setValue("/date", TimeHandler.getDate() );
	}
	

	@Override
	public void update(Session session){
logger.info("geupdated: " + handler.getTime() );
		updateVariable(session, "/time", handler.getTime());		
updateVariable(session, "/date", handler.getDate());
							}
	}