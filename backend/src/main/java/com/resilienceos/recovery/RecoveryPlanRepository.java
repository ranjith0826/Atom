package com.resilienceos.recovery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecoveryPlanRepository extends JpaRepository<RecoveryPlan, String> {
}
