/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { getDashboardMeta } from "@/services/meta/meta";

export default async function TravelerDashboard() {
  const meta = await getDashboardMeta();

  if (!meta) {
    return (
      <div className="p-6">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { overview, subscription, recentActivity } = meta;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Traveler Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{overview.myPlansCount}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Pending: {overview.pendingPlans} | Ongoing:{" "}
              {overview.ongoingPlans} | Completed: {overview.completedPlans}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {overview.sentRequestsCount}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Pending: {overview.pendingRequests} | Accepted:{" "}
              {overview.acceptedRequests}
            </div>
            <div className="mt-2">
              Received: {overview.receivedRequestsCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{overview.avgRating}</div>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Total Reviews: {overview.totalReviews}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscription.plan}</div>
            <Badge
              variant={subscription.isActive ? "success" : "destructive"}
              className="mt-2"
            >
              {subscription.isActive ? "Active" : "Inactive"}
            </Badge>
            {subscription.isActive && (
              <div className="text-sm text-muted-foreground mt-2">
                Ends: {format(new Date(subscription.end), "PPP")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.plans.map((plan: any) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.destination}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          plan.status === "PENDING"
                            ? "default"
                            : plan.status === "ONGOING"
                            ? "secondary"
                            : "success"
                        }
                      >
                        {plan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.requests.map((req: any) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.travelPlan.destination}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === "PENDING"
                            ? "default"
                            : req.status === "ACCEPTED"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.reviews.map((review: any) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.reviewer.name}</TableCell>
                    <TableCell>{review.rating}/5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
