package de.ableitner.vlcapi.testtool;

import java.lang.reflect.Type;

import de.ableitner.vlcapi.helpers.Checker;

public class Parameter {
	
	// ============================================================================================================================================
	// ============================================================================================================================================
	// Attributes
	// ============================================================================================================================================
	// ============================================================================================================================================
	
	private Type parameterType;
	private String parameterName;
	private boolean required;
	
	
	
	
	// ============================================================================================================================================
	// ============================================================================================================================================
	// Constructors
	// ============================================================================================================================================
	// ============================================================================================================================================
	
	public Parameter(Type parameterType, String parameterName, boolean required){
		Checker.checkNull(parameterType, "parameterType");
		Checker.checkNullAndEmptiness(parameterName, "parameterName");
		this.parameterName = parameterName;
		this.required = required;
	}
	
	
	
	
	// ============================================================================================================================================
	// ============================================================================================================================================
	// Getters and Setters
	// ============================================================================================================================================
	// ============================================================================================================================================

	public Type getParameterType() {
		return this.parameterType;
	}

	public String getParameterName() {
		return this.parameterName;
	}

	public boolean isRequired() {
		return this.required;
	}
	
	
	
	
	// ============================================================================================================================================
	// ============================================================================================================================================
	// override Methods
	// ============================================================================================================================================
	// ============================================================================================================================================

	// ============================================================================================================================================
	// ============================================================================================================================================
	// public Methods
	// ============================================================================================================================================
	// ============================================================================================================================================

	// ============================================================================================================================================
	// ============================================================================================================================================
	// private Methods
	// ============================================================================================================================================
	// ============================================================================================================================================

}
