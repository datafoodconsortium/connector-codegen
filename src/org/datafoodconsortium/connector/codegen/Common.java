package org.datafoodconsortium.connector.codegen;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.common.util.WrappedException;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.ocl.types.OrderedSetType;
import org.eclipse.ocl.types.impl.SequenceTypeImpl;
import org.eclipse.uml2.uml.Class;
import org.eclipse.uml2.uml.Classifier;
import org.eclipse.uml2.uml.Element;
import org.eclipse.uml2.uml.Interface;
import org.eclipse.uml2.uml.NamedElement;
import org.eclipse.uml2.uml.Operation;
import org.eclipse.uml2.uml.Package;
import org.eclipse.uml2.uml.Parameter;
import org.eclipse.uml2.uml.Property;
import org.eclipse.uml2.uml.Stereotype;
import org.eclipse.uml2.uml.Type;
import org.eclipse.uml2.uml.UMLPackage;
import org.eclipse.uml2.uml.resource.UMLResource;
import org.eclipse.uml2.uml.resources.util.UMLResourcesUtil;

public class Common {
	
	/*public interface Profiles {
		public static final String CONNECTOR = "datafoodconsortium_connector";
	}*/
	
	static final ResourceSet RESOURCE_SET;
	static final Package PRIMITIVE_TYPES;
	static final Random RANDOM;
	
	static {
		// Create a resource-set to contain the resource(s) that we load and
        // save
		RESOURCE_SET = new ResourceSetImpl();

        // Initialize registrations of resource factories, library models,
        // profiles, Ecore metadata, and other dependencies required for
        // serializing and working with UML resources. This is only necessary in
        // applications that are not hosted in the Eclipse platform run-time, in
        // which case these registrations are discovered automatically from
        // Eclipse extension points.
        UMLResourcesUtil.init(RESOURCE_SET);
        
        PRIMITIVE_TYPES = load(URI.createURI(UMLResource.UML_PRIMITIVE_TYPES_LIBRARY_URI));
        RANDOM = new Random();
	}
	
	public static Package load(URI uri) {
        Package loadedPackage = null;

        try {
            // Load the requested resource
            Resource resource = RESOURCE_SET.getResource(uri, true);

            // Get the first (should be only) package from it
            loadedPackage = (Package) EcoreUtil.getObjectByType(resource.getContents(), UMLPackage.Literals.PACKAGE);
        } catch (WrappedException we) {
            System.err.println(we.getMessage());
            // System.exit(1);
        }

        return loadedPackage;
    }
	
	public Boolean init() { return true; }
	
	public static String getStereotypeName(String profile, String stereotype) {
		return profile + "::" + stereotype;
	}
	
	public Operation getConstructorOperation(Class constructible, Stereotype stereotype) throws Exception {
		for (Operation operation : constructible.getOwnedOperations()) {
			if (operation.isStereotypeApplied(stereotype))
				return operation;
		}
		throw new Exception("The class " + constructible.getName() + " has no constructor operation.");
	}
	
	/*
	public boolean isPrimitive(Type literal) {
		String[] literals = { "Boolean", "String", "Real", "Integer" };
		return Arrays.asList(literals).contains(literal.getName());
	}*/
	
	public String getTypeName(Type aType) {
		String typeName = aType.getName();
		if (typeName.equals("Boolean"))
			return "bool";
		else if (typeName.equals("String"))
			return "string";
		else if (typeName.equals("Real"))
			return "number";
		else if (typeName.equals("Integer"))
			return "number";
		return typeName;
	}
	
	public Object getStereotypeValue(NamedElement element, String stereotypeName, String attributeName) {
		Object result = null;
		List<Stereotype> stereotypes = element.getAppliedStereotypes();
		for (Stereotype stereotype : stereotypes) {
			if (stereotype.getName().equals(stereotypeName)) {
				try {
					result = element.getValue(stereotype, attributeName);
				} catch(Exception e) {
					System.err.println("Failed to getStereotypeValue of stereotype " + stereotypeName + " for " + element.getName());
				}
			}
		}
		return result;
	}
	
	/*
	public String getAttributeForStereotypedOperation(Class aClass, String stereotypeName, String operationName) {
		List<Property> properties = aClass.getOwnedAttributes();
		for (Property property: properties) {
			if (isProperty(property) || isPropertyMultiple(property)) {
				String propertyName = isProperty(property)? Stereotypes.PROPERTY : Stereotypes.PROPERTY_MULTIPLE;
				Operation value = (Operation) getStereotypeValue(property, propertyName, stereotypeName);
				if (value != null && value.getName().equals(operationName))
					return property.getName();
			}
		}
		return "";
	}
	
	public List<Property> getConstructorUninitializedAttributes(Operation constructor) throws Exception {
		//if (constructor.getAppliedStereotype("constructor") == null)
			//throw new Exception("Not a constructor operation.");
		
		Class owner = (Class) constructor.getOwner();
		List<Property> properties = new ArrayList<Property>();
		List<Property> initializedProperties = new ArrayList<Property>();
		
		String initializerStereotypeName = getStereotypeName(Profiles.CONNECTOR, Stereotypes.INITIALIZER);
		String initializerParentStereotypeName = getStereotypeName(Profiles.CONNECTOR, Stereotypes.INITIALIZER_PARENT);
		
		for (Parameter parameter: constructor.getOwnedParameters()) {
			Stereotype initializer = parameter.getAppliedStereotype(initializerStereotypeName);
			Stereotype initializerParent = parameter.getAppliedStereotype(initializerParentStereotypeName);
			
			Property initializedProperty = null;
			
			if (parameter.isStereotypeApplied(initializer))
				initializedProperty = (Property) parameter.getValue(initializer, "property");
			
			else if (parameter.isStereotypeApplied(initializerParent))
				initializedProperty = (Property) parameter.getValue(initializerParent, "property");
			
			initializedProperties.add(initializedProperty);
		}
		
		for (Property property: owner.getOwnedAttributes()) {
			if (! initializedProperties.contains(property))
				properties.add(property);
		}

		return properties;
	}*/
	
	public List<Operation> getUnimplementedOperations(Classifier aClass) {
		List<Operation> implementedOperations = new ArrayList<Operation>();
		List<Operation> unimplementedOperations = new ArrayList<Operation>();
		List<Classifier> generals = aClass.getGenerals();
		
		for (Interface anInterface: aClass.allRealizedInterfaces())
			unimplementedOperations.addAll(anInterface.getAllOperations());
		
		if (!generals.isEmpty()) {
			Classifier baseClass = generals.get(0);
			
			for (Interface anInterface: baseClass.allRealizedInterfaces())
				implementedOperations.addAll(anInterface.getAllOperations());
			
			implementedOperations.addAll(getUnimplementedOperations(baseClass)); // recursive call
		}
		
		unimplementedOperations.removeAll(implementedOperations);
	
		return unimplementedOperations;
	}
	
	public String generateString(Integer length)
	{
		String characters = "abcdefghijklmnopqrstuvwxyz";
	    char[] text = new char[length];
	    for (int i = 0; i < length; i++)
	    {
	        text[i] = characters.charAt(RANDOM.nextInt(characters.length()));
	    }
	    return new String(text);
	}
	
	public Float generateReal()
	{
		return RANDOM.nextFloat();
	}
	
	public Boolean generateBoolean()
	{
		return RANDOM.nextBoolean();
	}
	
	public Integer generateInteger()
	{
		return RANDOM.nextInt();
	}
	
	public String generateValue(String typeName) throws Exception {
		String result = "";
		
		switch (typeName) {
			case "String":
				result = "\"" + generateString(10) + "\"";
				break;
				
			case "Integer":
				result = "" + generateInteger();
				break;
				
			case "Real":
				result = "" + generateReal();
				break;
				
			case "Boolean":
				result = "" + generateBoolean();
				break;
	
			default:
				result = "" + generateString(10);
				break;
		}
		
		if (result == "") throw new Exception("Unable to generate a test value for type name: " + typeName);
		
		return result;
	}
	
	public ArrayList<String> getTestValues(ArrayList<Parameter> parameters) throws Exception {
		ArrayList<String> result = new ArrayList<String>();
		
		for (Parameter aParameter : parameters) {
			result.add(generateValue(aParameter.getType().getName()));
		}
		
		return result;
	}
	
}
