package org.datafoodconsortium.connector.codegen;

import org.eclipse.acceleo.engine.event.AcceleoTextGenerationEvent;
import org.eclipse.acceleo.engine.event.IAcceleoTextGenerationListener;
import org.eclipse.acceleo.model.mtl.Block;

public class Logger implements IAcceleoTextGenerationListener {
	
	private int generatedFiles = 0;

	@Override
	public void textGenerated(AcceleoTextGenerationEvent event) {
		
	}

	@Override
	public void filePathComputed(AcceleoTextGenerationEvent event) {

	}

	@Override
	public void fileGenerated(AcceleoTextGenerationEvent event) {
		System.out.println("Generated " + event.getText() + " file");
		this.generatedFiles++;
	}

	@Override
	public void generationEnd(AcceleoTextGenerationEvent event) {
		// Confirm generation onto console
		System.out.println(this.generatedFiles + " files generated.");
        System.out.println("Source code successfuly generated!");
        // System.out.println("Output: " + folder.getPath());
	}

	@Override
	public boolean listensToGenerationEnd() {
		return false;
	}

}
