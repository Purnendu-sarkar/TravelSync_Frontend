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
import { Star, Users, MapPin, DollarSign } from "lucide-react";
import { getDashboardMeta } from "@/services/meta/meta";

export default async function AdminDashboard() {
  const meta = await getDashboardMeta();

  if (!meta) {
    return (
      <div className="p-6">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { overview, subscriptionStats, recentActivity } = meta;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Travelers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{overview.totalTravelers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Plans</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {overview.totalActivePlans}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Completed: {overview.totalCompletedPlans}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{overview.avgRating}</div>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Total: {overview.totalReviews}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${overview.totalRevenue}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Total Payments: {overview.totalPayments}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionStats.map((stat: any) => (
              <div
                key={stat.plan}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <span className="font-medium">{stat.plan}</span>
                <Badge variant="secondary">{stat.count} users</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Travel Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Traveler</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.plans.map((plan: any) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.destination}</TableCell>
                    <TableCell>{plan.traveler.name}</TableCell>
                    <TableCell>
                      {format(new Date(plan.createdAt), "PPP")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.reviews.map((review: any) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.reviewer.name}</TableCell>
                    <TableCell>{review.travelPlan.destination}</TableCell>
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
