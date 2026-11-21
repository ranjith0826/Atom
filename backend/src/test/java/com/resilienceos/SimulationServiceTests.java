package com.resilienceos;

import com.resilienceos.simulation.SimulationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SimulationServiceTests {

    @Autowired
    private SimulationService simulationService;

    @Test
    void testSimulationExecution() {
        Map<String, Object> req = Map.of(
                "scenarioType", "POWER_GRID_COLLAPSE",
                "initiatingAssetId", "asset-pwr-01",
                "durationHours", 12
        );
        Map<String, Object> result = simulationService.executeSimulation(req);

        assertNotNull(result);
        assertEquals("POWER_GRID_COLLAPSE", result.get("scenarioType"));
        assertTrue((Double) result.get("preventedLossesWithAI") > 0);
    }
}
