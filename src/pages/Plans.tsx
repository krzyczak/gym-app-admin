import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PlanForm from "./PlanForm";

import apiClient from "../utils/apiClient";

interface State {
  plans: Array<{ scheme: object; id: number }>;
  error?: string;
  pending: boolean;
  activePlanIndex: number;
}

function cancellablePromise<T>(
  promise: T
): [T | Promise<{ canceled: boolean }>, () => void] {
  let cancel = () => {};

  const racePromise = Promise.race([
    new Promise((resolve) => {
      cancel = () => resolve({ canceled: true });
    }),
    promise,
  ]);

  return [racePromise as T | Promise<{ canceled: true }>, cancel];
}

class PlansPage extends Component<{}, State> {
  state: State = {
    plans: [],
    pending: true,
    activePlanIndex: 0,
  };

  unmountCallbacks = new Set<() => void>();

  cancelablePromise(promise: Promise<any>) {
    return new Promise((resolve, reject) => {
      const [responsePromise, cancel]: [
        Promise<any>,
        () => void
      ] = cancellablePromise(promise);

      responsePromise
        .then((result) => {
          if (!result.canceled) {
            resolve(result);
          }
        })
        .catch((e) => reject(e))
        .finally(() => {
          this.unmountCallbacks.delete(cancel);
        });
    });
  }

  componentDidMount() {
    this.fetchPlans();
  }

  fetchPlans() {
    this.setState({
      pending: true,
    });

    this.cancelablePromise(apiClient.get("/admin/plans")).then(
      (response: any) => {
        this.setState({
          plans: response.data.plans,
          pending: false,
        });
      }
    );
  }

  onChangePlan = (newActivePlanIndex: number) => {
    this.setState({
      activePlanIndex: newActivePlanIndex,
      error: undefined,
    });
  };

  onSubmit = (plan: object) => {
    const { activePlanIndex, plans } = this.state;

    this.setState({
      error: undefined,
      pending: true,
    });

    this.cancelablePromise(
      apiClient.put(`/admin/plans/${plans[activePlanIndex].id}`, {
        scheme: plan,
      })
    )
      .then(() => {
        this.fetchPlans();
      })
      .catch((e) => {
        this.setState({
          pending: false,
          error: e.response.data.message || e.response.data.error,
        });
      });
  };

  render() {
    const { plans, activePlanIndex, pending, error } = this.state;

    if (plans.length === 0) {
      return "Fetching...";
    }

    return (
      <>
        <Tabs
          value={activePlanIndex}
          onChange={(e, value) => this.onChangePlan(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="GYM" disabled={pending} />
          <Tab label="HOME" disabled={pending} />
        </Tabs>
        <PlanForm
          plan={plans[activePlanIndex].scheme}
          onSubmit={this.onSubmit}
          pending={pending}
          error={error}
        />
      </>
    );
  }
}

export default PlansPage;
