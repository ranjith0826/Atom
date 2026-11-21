package com.resilienceos;

import com.resilienceos.asset.AssetDto;
import com.resilienceos.asset.AssetService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AssetServiceTests {

    @Autowired
    private AssetService assetService;

    @Test
    void testGetAllAssets() {
        List<AssetDto> assets = assetService.getAllAssets();
        assertNotNull(assets);
        assertFalse(assets.isEmpty(), "Assets should be seeded on startup");
        assertTrue(assets.stream().anyMatch(a -> a.getCode().equals("PWR-RHEIN-04")));
    }
}
