import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { AdminNavMenu } from './AdminNavMenu';
import { UserNavMenu } from './UserNavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

    render() {
        if (sessionStorage.getItem("usertype") === "admin") {
            return (

                <div>
                    <AdminNavMenu />
                    <Container tag="main">
                        {this.props.children}
                    </Container>
                </div>
            );
        }
        else if (sessionStorage.getItem("usertype")==="user") {
            return (

                <div>
                    <UserNavMenu />
                    <Container tag="main">
                        {this.props.children}
                    </Container>
                </div>
            );
        }
        else {
            return (
                <div>
                    <NavMenu />
                    <Container tag="main">
                        {this.props.children}
                    </Container>
                </div>
            );
        }
      
  }
}
